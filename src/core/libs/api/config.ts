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

const clearSession = () => {
  localStorage.removeItem(CONFIG_APP.TOKEN_KEY);
  localStorage.removeItem(CONFIG_APP.REFRESH_TOKEN_KEY);
};

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
  const refreshToken = localStorage.getItem(CONFIG_APP.REFRESH_TOKEN_KEY);
  if (!refreshToken) return false;
  try {
    const res = await fetch(API_ENDPOINT.auth.refreshToken, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    if (!res.ok) return false;
    const body = await res.json();
    const data = body?.data;
    if (!data?.accessToken || !data?.refreshToken) return false;
    localStorage.setItem(CONFIG_APP.TOKEN_KEY, data.accessToken);
    localStorage.setItem(CONFIG_APP.REFRESH_TOKEN_KEY, data.refreshToken);
    return true;
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

  const token =
    localStorage.getItem(CONFIG_APP.TOKEN_KEY) || "";
  if (token) {
    defaultValue.bearerToken = token;
  }

  const res: Response = await fetch(
    generateEndpoint(endpoint as string, apiOption?.path || "", {
      ...apiOption?.queryParams,
    }),
    {
      method,
      headers: {
        ...(defaultValue.contentType !== "form-data" && {
          "Content-Type": getContentType(defaultValue?.contentType),
        }),
        ...(defaultValue?.bearerToken &&
          typeof defaultValue.bearerToken !== "undefined" && {
            Authorization: `Bearer ${defaultValue.bearerToken}`,
          }),
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
    clearSession();
    redirectToSignIn();
    throw attempt.data;
  }

  const retry = await sendRequest(endpoint, method, apiOption, body);
  if (retry.ok) return retry.data as Res;
  if (retry.status === 401) {
    clearSession();
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
