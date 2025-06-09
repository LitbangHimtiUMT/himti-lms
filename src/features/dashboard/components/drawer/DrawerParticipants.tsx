import Default from "@core/assets/default-photo.svg";
import { Search } from "lucide-react";
import React from "react";
import { Button } from "../../../_global/components/Button";
import { Drawer } from "../../../_global/components/Drawer";
import { Input } from "../../../_global/components/Input";
import { useParticipants } from "../../hooks/participants/useParticipants";
import { Skeleton } from "../../../_global/components/Shimer";

interface DrawerParticipantsProps {
  show: boolean;
  onHide: () => void;
  classId: string;
  onInvite?: () => void;
  title?: string;
  position?: "left" | "right";
}

export const DrawerParticipants: React.FC<DrawerParticipantsProps> = ({
  show,
  onHide,
  onInvite,
  title = "Class Participants",
  position = "right",
  classId,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const { data: participants, isFetching } = useParticipants({
    path: `participant/${classId}`,
    search: searchQuery,
    enabled: show && !!classId,
  });

  return (
    <Drawer
      show={show}
      onHide={onHide}
      position={position}
      close={{ title: "Close" }}
      style={{
        marginTop: "3rem",
      }}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search participants..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          {isFetching ? (
            <>
              <div className="flex flex-col gap-3 px-3">
                <Skeleton width="100%" height="3.5rem" />
                <Skeleton width="100%" height="3.5rem" />
                <Skeleton width="100%" height="3.5rem" />
              </div>
            </>
          ) : participants?.data?.length ? (
            <ul className="flex-col gap-3 items-center justify-center">
              {participants?.data?.map((participant, index) => (
                <li
                  key={participant.id}
                  className={`flex items-center justify-between py-3 transition-colors cursor-pointer ${
                    index !== participants?.data?.length as number - 1 ? "border-b border-solid border-gray-500" : ""
                  }`}
                >
                  <div className="flex items-center space-x-3 hover:bg-gray-50 w-full px-2 rounded-lg">
                    <img
                      src={participant.user.photo || Default}
                      onError={(e) =>
                        ((e.target as HTMLImageElement).src = Default)
                      }
                      alt={participant.user.name}
                      className="w-10 h-10 rounded-full object-cover transform transition-transform duration-300 hover:scale-110"
                    />
                    <div>
                      <p className="font-medium">{participant?.user?.name}</p>
                      <p className="text-sm text-gray-500">
                        {participant?.user?.email}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p>No participants found</p>
            </div>
          )}
        </div>

        {onInvite && (
          <div className="p-4 border-t">
            <Button className="w-full" variant="secondary" onClick={onInvite}>
              Invite People
            </Button>
          </div>
        )}
      </div>
    </Drawer>
  );
};
