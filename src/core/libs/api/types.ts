export interface QueryParams {
  page?: number;
  perPage?: number;
  search?: string;
  subAcaraId?: string;
  eventMeetingId?: string;
}

export interface ApiOption {
  contentType?: "json" | "form-data" | "url-encoded";
  headers?: HeadersInit;
  path?: string;
  queryParams?: QueryParams;
}

export interface MetaResponse {
  page?: number;
  perPage?: number;
  totalData?: number;
  totalPages?: number;
}

export interface ApiResponse<Res = unknown> {
  status?: number;
  code?: string;
  message?: string;
  data?: Res;
  meta?: MetaResponse;
}

export const getContentType = (type?: ApiOption["contentType"]) => {
  switch (type) {
    case "form-data":
      return undefined;
    case "url-encoded":
      return "application/x-www-form-urlencoded";
    default:
      return "application/json";
  }
};

export type MethodTypes = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
