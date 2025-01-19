import { API_ENDPOINT } from "@core/configs/app";
import { HTTP_REQUEST } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { NotificationBodyRequest } from "@core/model/notification";

export const notificationService = {
    sendAll: HTTP_REQUEST.post<ApiResponse, NotificationBodyRequest>(API_ENDPOINT.notification),
    sendSingle: HTTP_REQUEST.post<ApiResponse, NotificationBodyRequest>(API_ENDPOINT.notification),
}