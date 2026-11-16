export interface DashboardStatsTotalsDTO {
  classes: number;
  participants: number;
  pendingReviews: number;
  certificates: number;
}

export interface DashboardStatsPerClassDTO {
  id: string;
  name: string;
  status: "PUBLISH" | "DRAFT";
  participants: number;
  pendingReviews: number;
  avgProgress: number;
}

export interface DashboardStatsReviewQueueDTO {
  submissionId: string;
  participantName: string;
  classId: string;
  className: string;
  sessionId: string;
  moduleId: string;
  assignmentId: string;
  assignmentTitle: string;
  submittedAt: string;
}

export interface DashboardStatsDTO {
  totals: DashboardStatsTotalsDTO;
  perClass: DashboardStatsPerClassDTO[];
  reviewQueue: DashboardStatsReviewQueueDTO[];
}
