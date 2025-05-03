import { API_ENDPOINT } from "../configs/app";
import { request } from "../libs/api/config";
import { ApiResponse } from "../libs/api/types";
import { CreateAssignmentDTO } from "../model/assignments";

export const assignmentService = {
  create: request.post<ApiResponse, CreateAssignmentDTO>(
    API_ENDPOINT.assignment
  ),
};
