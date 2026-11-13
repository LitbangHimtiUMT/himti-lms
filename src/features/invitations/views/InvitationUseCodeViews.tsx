import { useParams } from "react-router-dom";
import { Button } from "../../_global/components/Button";
import { ConditionNode } from "../../_global/components/ConditionNode";
import { Skeleton } from "../../_global/components/Shimer";
import { Poppins } from "../../_global/components/Text";
import {
  useClassesCreation,
  useDetailClass,
} from "../../class/hooks/useClasses";
import { useProfile } from "../../profile/useProfile";

export const InvitationUseCodeViews = () => {
  const { data: classes, isFetching: classFetching } = useDetailClass("code");
  const { data: profile, isFetching: profileFetching } = useProfile();

  const mutation = useClassesCreation();

  const { code } = useParams();

  const handleJoinInvitation = async () => {
    await mutation.mutateAsync({
      code,
      type: "join-invitation",
    });
  };

  const isCreator = classes?.data?.creator?.id === profile?.data?.id;
  const isFetching = classFetching || profileFetching;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Invitation Join
        </h2>
        <p className="text-gray-500 mb-6">
          You have been invited to join the following class:
        </p>

        {isFetching ? (
          <div className="flex flex-col items-center gap-2">
            <Skeleton width="75%" height="1.5rem" />
            <Skeleton width="60%" height="1rem" />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="mb-4">
              <p className="text-lg font-semibold text-gray-700">
                {classes?.data?.name}
              </p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Poppins className="text-sm text-gray-400">
                  Invitation Code:
                </Poppins>
                <Poppins className="font-medium text-sm text-gray-600">
                  {atob(classes?.data?.code ?? "")}
                </Poppins>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3 w-full">
              <ConditionNode
                condition={
                  !!classes?.data?.isAlreadyJoin && !isCreator && !isFetching
                }
              >
                <div className="bg-red-100 w-[75#] text-red-800 border border-red-300 text-sm rounded-md px-4 py-3 mt-4">
                  You have joined this class.
                </div>
              </ConditionNode>
              <ConditionNode
                condition={
                  isCreator && !classes?.data?.isAlreadyJoin && !isFetching
                }
              >
                <div className="bg-red-100 w-[75#] text-red-800 border border-red-300 text-sm rounded-md px-4 py-3 mt-4">
                  Mentor cannot join this class as participants.
                </div>
              </ConditionNode>
              <div className="w-1/3">
                <Button
                  size="lg"
                  variant={
                    isCreator ||
                    classes?.data?.isAlreadyJoin ||
                    isFetching ||
                    mutation.isPending
                      ? "disabled"
                      : "primary"
                  }
                  onClick={handleJoinInvitation}
                >
                  {mutation.isPending ? "Loading..." : "Join Class"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
