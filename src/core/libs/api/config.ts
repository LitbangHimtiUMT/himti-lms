import { convertObjectToQueryParams } from "@features/_global/helper";
import { ApiOption, MethodTypes, getContentType } from "./types";
import { CONFIG_APP } from "../../configs/app";

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

async function createRequest<Res = unknown, Req = unknown>(
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

  if (!res.ok) {
    throw data;
  }
  return data as Res;
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
