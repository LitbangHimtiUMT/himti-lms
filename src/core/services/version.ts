import { API_ENDPOINT } from "@core/configs/app";
import { HTTP_REQUEST } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { VersionModel } from "@core/model/version";

export const versionService = {
  get: HTTP_REQUEST.get<ApiResponse<VersionModel>>(API_ENDPOINT.version),
  update: HTTP_REQUEST.put<ApiResponse, VersionModel>(API_ENDPOINT.version),
};
