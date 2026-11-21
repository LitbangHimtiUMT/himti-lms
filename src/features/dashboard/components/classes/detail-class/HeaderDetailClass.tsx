import { useState } from "react";
import { Button } from "../../../../_global/components/Button";
import { ConditionNode } from "../../../../_global/components/ConditionNode";
import { Skeleton } from "../../../../_global/components/Shimer";
import {
  useClassesCreation,
  useDetailClass,
} from "../../../../class/hooks/useClasses";
import { useCertificateEligibility } from "../../../../certificates/hooks/useCertificateEligibility";
import { useGenerateCertificate } from "../../../hooks/certificates/useGenerateCertificate";
import { CONFIG_APP } from "../../../../../core/configs/app";
import { DrawerParticipants } from "../../drawer/DrawerParticipants";
import { Poppins } from "../../../../_global/components/Text";
import { DrawerMentorClass } from "../../drawer/DrawerMentorClass";
import { Dialog } from "../../../../_global/components/Dialog";
import { MarkCompletedDialog } from "../MarkCompletedDialog";
import { IoWarningOutline } from "react-icons/io5";

export const HeaderDetailClass = () => {
  const {
    data: classes,
    isLoading: isClassLoading,
    isFetching: isClassFetching,
  } = useDetailClass();
  const [show, setShow] = useState({
    participant: false,
    mentor: false,
    delete: false,
    complete: false,
  });
  const mutation = useClassesCreation();

  const classId = classes?.data?.id;
  const isCompleted = !!classes?.data?.completedAt;
  const canComplete =
    !!classId && classes?.data?.status !== "DRAFT" && !isCompleted;

  // The button row follows the class query, not the profile query:
  // the profile can be cached while the class is still loading (zero
  // skeletons, buttons popping in one by one), and every background
  // profile refetch used to collapse the row back into skeletons.
  // Cached class data renders the buttons immediately, no flash.
  const isClassLoadingState =
    isClassLoading || (isClassFetching && !classes?.data);

  // Mentor certificate claim: the eligibility endpoint decides the
  // caller's path server-side; the button only appears for class
  // mentors (creator or co-mentor) once the class can actually
  // issue their certificate — eligible, or already holding one.
  // While the answer is loading, the slot shows a skeleton; a
  // non-mentor never gets a slot at all.
  const {
    data: eligibility,
    isLoading: isEligibilityLoading,
    isFetching: isEligibilityFetching,
  } = useCertificateEligibility(
    classId,
    !!classId && !!classes?.data?.isClassMentor
  );
  // Cached eligibility renders the button immediately; the skeleton
  // only covers the first load, when there is nothing to show yet.
  const isEligibilityLoadingState =
    isEligibilityLoading || (isEligibilityFetching && !eligibility?.data);
  const generateCertificate = useGenerateCertificate();
  const certificateCode = eligibility?.data?.certificateCode;
  const hasCertificate =
    eligibility?.data?.hasCertificate === true && !!certificateCode;
  const certificateFileUrl = certificateCode
    ? `${CONFIG_APP.BASE_URL}/lms/certificates/file?code=${certificateCode}`
    : null;
  const showClaimAction =
    hasCertificate || (eligibility?.data?.eligible ?? false);

  const handleDeleteClass = async () => {
    if (classes?.data?.id) {
      try {
        await mutation.mutateAsync({ id: classes?.data?.id, type: "delete" });
        setShow((prev) => ({ ...prev, delete: !prev.delete }));
      } catch {
        // The mutation's onError toast already reports the failure;
        // keep the dialog open so the user can retry.
      }
    }
  };
  return (
    <>
      <div className="flex md:flex-row flex-col md:items-center justify-between w-full gap-4">
        <Poppins className="text-2xl font-bold">Detail Class</Poppins>
        {/* flex-wrap: six 192px buttons need 1232px, but the content
            column is narrower than that below ~1700px viewports, so
            without wrapping the row squeezes the buttons (and
            overflows below 1024px with the sidebar expanded).
            Wrapping keeps every button at full width and grows the
            row instead. The three always-visible slots show a
            skeleton while the class loads; the data-dependent slots
            (Archive/Unarchive, Mark Completed) render as real buttons
            the moment the class data arrives — no skeleton phase,
            because their existence is unknowable before that. */}
        <div className="flex md:flex-row flex-col flex-wrap gap-4">
          <div className="md:w-48 w-full">
            <ConditionNode
              condition={!isClassLoadingState}
              option={<Skeleton width="100%" height="2rem" />}
            >
              <Button
                variant="success"
                onClick={() =>
                  setShow((prev) => ({ ...prev, mentor: !prev.mentor }))
                }
              >
                View Mentors
              </Button>
            </ConditionNode>
          </div>
          <div className="md:w-48 w-full">
            <ConditionNode
              condition={!isClassLoadingState}
              option={<Skeleton width="100%" height="2rem" />}
            >
              <Button
                onClick={() =>
                  setShow((prev) => ({
                    ...prev,
                    participant: !prev.participant,
                  }))
                }
              >
                View Participants
              </Button>
            </ConditionNode>
          </div>
          <div className="md:w-48 w-full">
            <ConditionNode
              condition={!isClassLoadingState}
              option={<Skeleton width="100%" height="2rem" />}
            >
              <Button
              variant="danger"
                onClick={() =>
                  setShow((prev) => ({
                    ...prev,
                    delete: !prev.delete,
                  }))
                }
              >
                Delete Class
              </Button>
            </ConditionNode>
          </div>
          {classes?.data?.status === "PUBLISH" && (
            <div className="md:w-48 w-full">
              <Button
                variant={
                  mutation.isPending &&
                  mutation.variables.type === "archive"
                    ? "disabled"
                    : "secondary"
                }
                onClick={() =>
                  classId && mutation.mutate({ id: classId, type: "archive" })
                }
              >
                {mutation.isPending &&
                mutation.variables.type === "archive"
                  ? "Archiving..."
                  : "Archive Class"}
              </Button>
            </div>
          )}
          {classes?.data?.status === "ARCHIVED" && (
            <div className="md:w-48 w-full">
              <Button
                variant={
                  mutation.isPending &&
                  mutation.variables.type === "unarchive"
                    ? "disabled"
                    : "secondary"
                }
                onClick={() =>
                  classId &&
                  mutation.mutate({ id: classId, type: "unarchive" })
                }
              >
                {mutation.isPending &&
                mutation.variables.type === "unarchive"
                  ? "Unarchiving..."
                  : "Unarchive Class"}
              </Button>
            </div>
          )}
          {canComplete && (
            <div className="md:w-48 w-full">
              <Button
                variant="warning"
                onClick={() =>
                  setShow((prev) => ({ ...prev, complete: !prev.complete }))
                }
              >
                Mark Completed
              </Button>
            </div>
          )}
          {classes?.data?.isClassMentor &&
            (showClaimAction || isEligibilityLoadingState) && (
              <div className="md:w-48 w-full">
                {showClaimAction ? (
                  hasCertificate && certificateFileUrl ? (
                    <Button
                      variant="secondary"
                      onClick={() =>
                        window.open(
                          certificateFileUrl,
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                    >
                      View Certificate
                    </Button>
                  ) : (
                    <Button
                      variant={
                        generateCertificate.isPending ? "disabled" : "primary"
                      }
                      onClick={() =>
                        classId && generateCertificate.mutate({ classId })
                      }
                    >
                      {generateCertificate.isPending
                        ? "Generating..."
                        : "Claim Certificate"}
                    </Button>
                  )
                ) : (
                  <Skeleton width="100%" height="2rem" />
                )}
              </div>
            )}
        </div>
      </div>
      <DrawerParticipants
        classId={classes?.data?.id || ""}
        onHide={() =>
          setShow((prev) => ({ ...prev, participant: !prev.participant }))
        }
        show={show.participant}
        title={`List Participant`}
      />
      <DrawerMentorClass
        onHide={() => setShow((prev) => ({ ...prev, mentor: !prev.mentor }))}
        show={show.mentor}
        title={`List Mentor`}
      />
      {show.complete && classes?.data && (
        <MarkCompletedDialog
          onHide={() =>
            setShow((prev) => ({ ...prev, complete: !prev.complete }))
          }
          classId={classes.data.id}
          className={classes.data.name}
          participantCount={classes.data.totalParticipant}
        />
      )}
      <ConditionNode condition={show.delete}>
        <Dialog
          onHide={() => setShow((prev) => ({ ...prev, delete: !prev.delete }))}
          show={show.delete}
        >
          <div className="p-6 flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-red-100 text-red-600">
                <IoWarningOutline className="text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                  Delete Class
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  This action will permanently delete the class and all its
                  contents. Are you sure you want to continue?
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="secondary" onClick={() => setShow((prev) => ({ ...prev, delete: !prev.delete }))}>
                Cancel
              </Button>
              <Button
                variant={mutation.isPending ? "disabled" : "danger"}
                onClick={handleDeleteClass}
              >
                {mutation.isPending ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </Dialog>
      </ConditionNode>
    </>
  );
};
