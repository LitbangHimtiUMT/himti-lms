import { API_ENDPOINT } from "../configs/app";
import { request } from "../libs/api/config";
import { ApiResponse } from "../libs/api/types";
import { DashboardStatsDTO } from "../model/dashboard-stats";

export const dashboardStatsService = {
  get: request.get<ApiResponse<DashboardStatsDTO>>(
    API_ENDPOINT.dashboardStats
  ),
};
