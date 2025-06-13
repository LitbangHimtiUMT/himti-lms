import Default from "@core/assets/default-photo.svg";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { Drawer } from "../../../_global/components/Drawer";
import { Input } from "../../../_global/components/Input";
import { Skeleton } from "../../../_global/components/Shimer";
import { useClassMentors, useMentors } from "../../hooks/mentors/userMentors";
import { DropdownRevamp } from "../../../_global/components/Dropdown/DropdownRevamp";
import { useParams } from "react-router-dom";
import { Button } from "../../../_global/components/Button";
import { useClassesCreation } from "../../../class/hooks/useClasses";
import { InviteMentorDTO } from "../../../../core/model/classes";

interface DrawerParticipantsProps {
  show: boolean;
  onHide: () => void;
  title?: string;
}

export const DrawerMentorClass: React.FC<DrawerParticipantsProps> = ({
  show,
  onHide,
  title = "List of Mentors",
}) => {
  const { classId } = useParams();
  const [searchQuery, setSearchQuery] = React.useState({
    classMentor: "",
    mentor: "",
  });
  const [mentorId, setMentorId] = useState("");

  const { data: classMentors, isFetching: isFetchingClassMentor } =
    useClassMentors({
      search: searchQuery.classMentor,
      enabled: show,
    });

  const { data: mentors, isFetching: isFetchingMentor } = useMentors({
    search: searchQuery.mentor,
    enabled: show,
    classId,
    page: 1,
    perPage: 99999,
  });

  const mutation = useClassesCreation();

  const handleInviteMentor = async () => {
    await mutation.mutateAsync({
      data: {
        classId,
        mentorId,
      } as InviteMentorDTO,
      type: "invite-mentor",
    });
    setMentorId("");
    setSearchQuery((prev) => ({ ...prev, mentor: "" }));
  };

  const handleBack = () => {
    onHide()
    setMentorId("");
    setSearchQuery({
      classMentor: "",
      mentor: "",
    });
  };

  return (
    <Drawer
      show={show}
      onHide={handleBack}
      close={{ title: "Back" }}
      style={{
        marginTop: "3rem",
      }}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <div className="mt-3 flex flex-col gap-2">
            <DropdownRevamp
              list={(mentors?.data || [])?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
              reset={!mentorId}
              disabled={!!isFetchingMentor}
              placeholder="Select Mentor"
              onSearch={(e) => setSearchQuery({ ...searchQuery, mentor: e })}
              searchInput
              inputValue={searchQuery.mentor}
              onChange={(e) => setMentorId(e.value)}
            />
            <Button
              variant={mentorId && !mutation.isPending ? "primary" : "disabled"}
              onClick={handleInviteMentor}
            >
              {mutation.isPending ? "Inviting..." : "Add Mentor"}
            </Button>
          </div>
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search Mentor..."
              className="pl-10"
              value={searchQuery.classMentor}
              onChange={(e) =>
                setSearchQuery((prev) => ({
                  ...prev,
                  classMentor: e.target.value,
                }))
              }
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          {isFetchingClassMentor ? (
            <>
              <div className="flex flex-col gap-3 px-3">
                <Skeleton width="100%" height="3.5rem" />
                <Skeleton width="100%" height="3.5rem" />
                <Skeleton width="100%" height="3.5rem" />
              </div>
            </>
          ) : classMentors?.data?.length ? (
            <ul className="flex-col gap-3 items-center justify-center">
              {classMentors?.data?.map((item, index) => (
                <li
                  key={item.id}
                  className={`flex items-center justify-between py-3 transition-colors cursor-pointer ${
                    index !== (classMentors?.data?.length as number) - 1
                      ? "border-b border-solid border-gray-500"
                      : ""
                  }`}
                >
                  <div className="flex items-center space-x-3 hover:bg-gray-50 w-full px-2 rounded-lg">
                    <img
                      src={item.user.photo || Default}
                      onError={(e) =>
                        ((e.target as HTMLImageElement).src = Default)
                      }
                      alt={item.user.name}
                      className="w-10 h-10 rounded-full object-cover transform transition-transform duration-300 hover:scale-110"
                    />
                    <div>
                      <p className="font-medium">{item?.user?.name}</p>
                      <p className="text-sm text-gray-500">
                        {item?.user?.email}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p>No Mentors found</p>
            </div>
          )}
        </div>
      </div>
    </Drawer>
  );
};
