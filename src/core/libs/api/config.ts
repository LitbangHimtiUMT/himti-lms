import { convertObjectToQueryParams } from "@features/_global/helper";
import { ApiOption, MethodTypes, getContentType } from "./types";
import { API_ENDPOINT, CONFIG_APP } from "../../configs/app";

const generateEndpoint = (
  endpoint: string,
  path?: string,
  queryParams?: Record<string, string | number | null | undefined>
) => {
  if (!endpoint) return "";
  let result = endpoint;
  if (path) {
    result = `${endpoint}/${path}`;
  }
  if (queryParams) {
    const query = convertObjectToQueryParams(queryParams);
    result = `${result}${query ? `?${query}` : ""}`;
  }
  return result;
};

// One shared refresh promise: parallel 401s wait for the same refresh
// instead of each firing its own (the backend rate-limits refresh calls).
let refreshPromise: Promise<boolean> | null = null;

const redirectToSignIn = () => {
  if (window.location.pathname !== "/sign-in") {
    window.location.href = "/sign-in";
  }
};

// Requests to the auth endpoints themselves (login, register, token check,
// refresh) must not trigger a refresh: a 401 there is an auth-flow result,
// not an expired session.
const isAuthEndpoint = (endpoint: string) =>
  endpoint.startsWith(`${CONFIG_APP.BASE_URL}/auth/`);

const doRefresh = async (): Promise<boolean> => {
  // The refresh token lives in an httpOnly cookie, so there is nothing
  // to read here: the browser sends it with credentials: "include",
  // and a fresh access cookie comes back on the response. Success is
  // just res.ok; the body is never read for tokens.
  try {
    const res = await fetch(API_ENDPOINT.auth.refreshToken, {
      method: "POST",
      credentials: "include",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    return res.ok;
  } catch {
    return false;
  }
};

const refreshAccessToken = (): Promise<boolean> => {
  if (!refreshPromise) {
    refreshPromise = doRefresh().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
};

async function sendRequest<Req = unknown>(
  endpoint: string,
  method: MethodTypes,
  apiOption?: ApiOption,
  body?: Req
) {
  const defaultValue = { ...apiOption };

  const res: Response = await fetch(
    generateEndpoint(endpoint as string, apiOption?.path || "", {
      ...apiOption?.queryParams,
    }),
    {
      method,
      // Auth travels in httpOnly cookies: include them on every
      // request, and mark the request so the API can tell a real
      // XHR apart from a cross-site navigation (CSRF check).
      credentials: "include",
      headers: {
        ...(defaultValue.contentType !== "form-data" && {
          "Content-Type": getContentType(defaultValue?.contentType),
        }),
        "X-Requested-With": "XMLHttpRequest",
        ...defaultValue?.headers,
      },
      body:
        getContentType(defaultValue?.contentType) === "application/json"
          ? JSON.stringify(body)
          : (body as BodyInit),
    }
  );
  let data: any = null;
  const contentType = res.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    try {
      data = await res.json();
    } catch (e) {
      data = null;
    }
  } else {
    try {
      const text = await res.text();
      try {
        data = JSON.parse(text);
      } catch (e) {
        data = text;
      }
    } catch (e) {
      data = null;
    }
  }

  return { ok: res.ok, status: res.status, data };
}

async function createRequest<Res = unknown, Req = unknown>(
  endpoint: string,
  method: MethodTypes,
  apiOption?: ApiOption,
  body?: Req
) {
  const attempt = await sendRequest(endpoint, method, apiOption, body);
  if (attempt.ok) return attempt.data as Res;
  if (attempt.status !== 401 || isAuthEndpoint(endpoint)) {
    throw attempt.data;
  }

  const refreshed = await refreshAccessToken();
  if (!refreshed) {
    redirectToSignIn();
    throw attempt.data;
  }

  const retry = await sendRequest(endpoint, method, apiOption, body);
  if (retry.ok) return retry.data as Res;
  if (retry.status === 401) {
    redirectToSignIn();
  }
  throw retry.data;
}

export const request = {
  get:
    <Res = unknown, Req = unknown>(endpoint: string) =>
    (apiOption?: ApiOption) =>
      createRequest<Res, Req>(endpoint, "GET", apiOption),
  post:
    <Res = unknown, Req = unknown>(endpoint: string) =>
    (body?: Req, apiOption?: ApiOption) =>
      createRequest<Res, Req>(endpoint, "POST", apiOption, body),
  put:
    <Res = unknown, Req = unknown>(endpoint: string) =>
    (body?: Req, apiOption?: ApiOption) =>
      createRequest<Res, Req>(endpoint, "PUT", apiOption, body),
  patch:
    <Res = unknown, Req = unknown>(endpoint: string) =>
    (body?: Req, apiOption?: ApiOption) =>
      createRequest<Res, Req>(endpoint, "PATCH", apiOption, body),
  delete:
    <Res = unknown, Req = unknown>(endpoint: string) =>
    (apiOption?: ApiOption) =>
      createRequest<Res, Req>(endpoint, "DELETE", apiOption),
};
