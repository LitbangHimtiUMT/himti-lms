import { useAtom } from "jotai";
import { MdChevronLeft } from "react-icons/md";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { LearningSidebarAtom } from "../../_global/store";
import { CardInstructor } from "./assignment/Card/CardInstructor";
import { HeaderAssignment } from "./assignment/HeaderAssignment";
import { AssignmentDetailSkeleton } from "./submission/SkeletonSubmission";

export interface AssignmentDataProps {
  id: string;
  title: string;
  description: string;
  type: "FILE" | "URL";
  module: {
    id: string;
    name: string;
  };
  dueDate?: Date;
  allowedFile?: string;
  createdBy: {
    name: string;
  };
  submission: {
    id: string;
    status: "APPROVE" | "REJECT" | "REVIEW";
    submittedAt: Date;
    file?: string;
    feedback?: string;
  } | null;
  activeSubmission?: {
    id: string;
    status: "APPROVE" | "REJECT" | "REVIEW";
    submittedAt: Date;
    file?: string;
    feedback?: string;
  };
  historySubmission?: {
    id: string;
    status: "APPROVE" | "REJECT" | "REVIEW";
    submittedAt: Date;
    file?: string;
    feedback?: string;
  }[];
  isHaveHistory: boolean;
}

export interface AssignmentDetailViewProps {
  mode: "current" | "history";
  data: AssignmentDataProps;
  type?: 'FILE' | 'URL'
  onSubmit?: (formData: FormData) => Promise<void>;
  isLoading?: boolean;
  isOpen?: boolean;
}

export const AssignmentDetailContent = ({
  mode,
  data,
  isLoading = false,
  isOpen,
  type,
}: AssignmentDetailViewProps) => {
  const [sidebarOpen] = useAtom(LearningSidebarAtom);

  // APPROVE lives in historySubmission, never in activeSubmission
  // (REVIEW-only), so the guard must read history, not data.submission.
  const haveApproveSubmission =
    data?.historySubmission?.some((item) => item.status === "APPROVE") ??
    false;
  const isSubmit =
    mode === "current" && !haveApproveSubmission && !data?.activeSubmission;

  if (!data || isLoading) {
    return <AssignmentDetailSkeleton />;
  }

  return (
    <div
      className={`p-4 md:p-6 transition-all duration-300 ${
        sidebarOpen ? "md:ml-64" : "md:ml-20"
      } w-full max-w-[1920px] mx-auto`}
    >
      <AssignmentBack />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-20">
        <HeaderAssignment
          data={data}
          mode={mode}
          type={type || 'URL'}
          isSubmit={isSubmit}
          isOpen={isOpen && !isLoading}
        />
        <CardInstructor userName={data.createdBy.name || ""} />
      </div>
    </div>
  );
};

export const AssignmentBack = () => {
  const { classId } = useParams();
  const [searchParams] = useSearchParams();
  const moduleId = searchParams.get("moduleId");
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(`/learning/${classId}${moduleId ? `?moduleId=${moduleId}` : ""}`);
  };
  return (
    <div
      className="flex items-center gap-1 mb-6 cursor-pointer"
      onClick={handleBack}
    >
      <MdChevronLeft size={24} />
      <span className="font-medium">Back to Learning</span>
    </div>
  );
};
