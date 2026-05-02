import { useAtom } from "jotai";
import { BiEditAlt, BiTrashAlt } from "react-icons/bi";
import { IoDocumentOutline, IoWarningOutline } from "react-icons/io5";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "../../_global/components/Button";
import { MasterTable } from "../../_global/components/MasterTable";
import { Poppins } from "../../_global/components/Text";
import { convertQueryParamsToObject } from "../../_global/helper";
import {
  useSessions,
  useSessionsCreation,
} from "../hooks/sessions/useSessions";
import { DrawerStateSession } from "../store";
import { CreateSession } from "./sessions/create-session/CreateSession";
import { ConditionNode } from "../../_global/components/ConditionNode";
import { useState } from "react";
import { Dialog } from "../../_global/components/Dialog";

export const SessionTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { classId } = useParams();
  const { data: sessions, isFetching } = useSessions();
  const queries = convertQueryParamsToObject(searchParams.toString());
  const navigate = useNavigate();
  const page = searchParams.get("page") || 1;
  const from = searchParams.get("from");

  const [sessionId, setSessionId] = useState("");

  const mutation = useSessionsCreation();

  const [, setSession] = useAtom(DrawerStateSession);

  const handleDeleteSession = async () => {
    if (sessionId) {
      mutation.mutateAsync({
        type: "delete",
        data: {
          name: "",
          id: sessionId,
        },
      });
      setSessionId("");
    }
  };

  const handleChangePage = (page: string) =>
    setSearchParams({ ...queries, page });
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex lg:flex-row flex-col lg:items-start justify-between lg:gap-0 gap-4">
          <h1 className="text-3xl font-bold">Sessions</h1>
          <CreateSession />
        </div>
        <MasterTable
          title={["Title", "Total Module", ""]}
          data={sessions?.data || []}
          isLoading={isFetching}
          withAction={false}
          pagination={{
            currentPage: Number(page),
            onPageChange: (page) => handleChangePage(page?.toString()),
            totalPages: sessions?.meta?.totalPages || 1,
          }}
          columnTable={[
            {
              return: (item) => <Poppins>{item.name}</Poppins>,
            },
            {
              return: (item) => (
                <Poppins>{`${item.module.length} Module`}</Poppins>
              ),
            },
            {
              return: (item) => (
                <div className="flex items-center gap-2 justify-end">
                  <div className="w-10">
                    <Button
                      variant={"secondary"}
                      onClick={() =>
                        navigate(
                          `/dashboard/${classId}/${item.id}${
                            from ? `?from=${from}` : ""
                          }`
                        )
                      }
                    >
                      <IoDocumentOutline />
                    </Button>
                  </div>
                  <div className="w-10">
                    <Button
                      variant={"success"}
                      onClick={() => {
                        setSession((prev) => ({
                          show: !prev.show,
                          data: {
                            id: item.id,
                            name: item.name,
                          },
                        }));
                      }}
                    >
                      <BiEditAlt />
                    </Button>
                  </div>
                  <div className="w-10">
                    <Button
                      variant={"danger"}
                      onClick={() => {
                        setSessionId(item.id);
                      }}
                    >
                      <BiTrashAlt />
                    </Button>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>
      <ConditionNode condition={!!sessionId}>
        <Dialog onHide={() => setSessionId("")} show={!!sessionId}>
          <div className="p-6 flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-red-100 text-red-600">
                <IoWarningOutline className="text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                  Delete Session
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  This action will permanently delete the session and all its
                  contents. Are you sure you want to continue?
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="secondary" onClick={() => setSessionId("")}>
                Cancel
              </Button>
              <Button
                variant={mutation.isPending ? "disabled" : "danger"}
                onClick={handleDeleteSession}
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
