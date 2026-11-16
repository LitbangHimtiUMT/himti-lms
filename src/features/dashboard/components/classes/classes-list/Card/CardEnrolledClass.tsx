import React from "react";
import { FaEye, FaStar } from "react-icons/fa";
import { IoDocumentOutline, IoImageOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ClassModel } from "../../../../../../core/model/classes";
import { Badge } from "../../../../../_global/components/Badge";
import { Button } from "../../../../../_global/components/Button";
import { formatRupiah } from "../../../../../_global/helper";
import { useProfile } from "../../../../../profile/useProfile";
import { useGenerateCertificate } from "../../../../hooks/certificates/useGenerateCertificate";
import { useCertificateEligibility } from "../../../../../certificates/hooks/useCertificateEligibility";
import { useClassReviews } from "../../../../../class/hooks/useReviews";
import { Poppins } from "../../../../../_global/components/Text";
import { CONFIG_APP } from "../../../../../../core/configs/app";

interface CardEnrolledClassProps extends ClassModel {}

export const CardEnrolledClass: React.FC<CardEnrolledClassProps> = ({
  category,
  name,
  price,
  progressStatus,
  thumbnail,
  certificate,
  id,
  total,
  totalSession,
  creator,
}) => {
  const navigate = useNavigate();
  const mutation = useGenerateCertificate();
  const { data: profile } = useProfile();

  const handleGenerate = (classId: string) =>
    mutation.mutate({
      classId,
    });

  const owner = profile?.data?.id === creator.id;
  // Eligibility decides the claim, not module progress: the hint and
  // the Claim button only exist for participants without a
  // certificate, so no request is made for owners or holders.
  // Until the answer arrives (or when it errors), neither shows:
  // claiming on unknown eligibility would be a guess.
  const { data: eligibility } = useCertificateEligibility(
    id,
    !certificate && !owner
  );
  const eligible = eligibility?.data?.eligible ?? false;
  const showHint =
    !certificate && !owner && !!eligibility?.data && !eligible;
  // Review prompt: only for certificate holders. One review per page
  // is enough — the prompt only reads canReview, which the server
  // computes (holder + not a class manager + no review yet). Until
  // the answer arrives, no prompt: showing it on unknown state would
  // send managers and past reviewers to a form they cannot use.
  const { data: reviews } = useClassReviews(id, 1, 1, !!certificate);
  const showReviewPrompt =
    !!certificate && reviews?.data?.canReview === true;
  return (
    <>
      <div
        className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
        onClick={() => navigate(`/learning/${id}`)}
      >
        {/* Thumbnail Section */}
        <div className="relative h-40 w-full bg-gray-100 dark:bg-gray-700">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/HIMTI.png";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
              <IoImageOutline className="text-4xl" />
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-4">
          <div className="flex flex-col mb-3">
            <h3
              className="font-medium text-gray-900 dark:text-white text-lg line-clamp-2"
            >
              {name}
            </h3>
            <div className="w-max">
              <Badge
                size="sm"
                variant={
                  progressStatus === "In Progress" ? "warning" : "success"
                }
              >
                {progressStatus}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {formatRupiah(price)}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="outline" size="sm" className="capitalize">
              {category.name}
            </Badge>
            <span className="text-gray-600 dark:text-gray-400 text-sm">
              {totalSession} sessions
            </span>
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
              <span>Progress</span>
              <span>{total.precentage}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-indigo-500 h-2 rounded-full"
                style={{ width: `${total.precentage}%` }}
              ></div>
            </div>
            {showHint && (
              <>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
                  Get all assignments approved to claim your certificate.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {eligibility?.data?.approvedAssignments ?? 0}/
                  {eligibility?.data?.totalAssignments ?? 0} assignments
                  approved
                </p>
              </>
            )}
          </div>

          {/* Review prompt (certificate holders who have not reviewed
              yet): a link to the detail page, where the only review
              form lives. No modal. */}
          {showReviewPrompt && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/class-detail/${id}`);
              }}
              className="w-full flex items-center gap-2 text-left text-sm font-medium text-amber-800 dark:text-amber-200 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-2 mb-4 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors"
            >
              <FaStar className="shrink-0 text-amber-400" />
              Rate this class and share your review.
            </button>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => navigate(`/learning/${id}`)}
                title="Detail"
              >
                <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                  <IoDocumentOutline className="shrink-0 text-gray-600 dark:text-gray-300" />
                  <Poppins>Detail</Poppins>
                </div>
              </Button>
            </div>

            {certificate ? (
              <div className="flex-1">
                <Button
                  size="sm"
                  variant="secondary"
                  tooltip="View Certificate"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(
                      `${CONFIG_APP.BASE_URL}/lms/certificates/file?code=${certificate.code}`,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }}
                >
                  <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                    <FaEye className="shrink-0 text-gray-600 dark:text-gray-300" />
                    <Poppins>View Certificate</Poppins>
                  </div>
                </Button>
              </div>
            ) : eligible && !owner ? (
              <div className="flex-1">
                <Button
                  tooltip="Claim Certificate"
                  size="sm"
                  variant={mutation.isPending ? "disabled" : "primary"}
                  onClick={(e) => {
                    e.stopPropagation(); // menghindari effect onClick pada parent
                    handleGenerate(id);
                  }}
                >
                  <span className="flex items-center justify-center whitespace-nowrap">
                    {mutation.isPending ? "Generating..." : "Claim Certificate"}
                  </span>
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
