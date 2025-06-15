import { API_ENDPOINT } from "../configs/app";
import { request } from "../libs/api/config";
import { ApiResponse } from "../libs/api/types";
import { AssignmentDTO, CreateAssignmentDTO } from "../model/assignments";
import { SubmissionDTO } from "../model/submission";

export const assignmentService = {
  create: request.post<ApiResponse, CreateAssignmentDTO>(
    API_ENDPOINT.assignment
  ),
  update: request.put<ApiResponse, CreateAssignmentDTO>(
    API_ENDPOINT.assignment
  ),
  submit: request.post<ApiResponse, FormData>(API_ENDPOINT.assignment),
  getById: request.get<ApiResponse<AssignmentDTO>>(API_ENDPOINT.assignment),
  submission: {
    getById: request.get<ApiResponse<SubmissionDTO>>(API_ENDPOINT.submissions),
    getByAssignment: request.get<ApiResponse<SubmissionDTO[]>>(API_ENDPOINT.submissions),
    approval: request.patch<ApiResponse<SubmissionDTO[]>>(API_ENDPOINT.submissions),
  },
};
