import Default from "@core/assets/default-photo.svg";
import { Download, Search } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";
import { Button } from "../../../_global/components/Button";
import { Drawer } from "../../../_global/components/Drawer";
import { Input } from "../../../_global/components/Input";
import { QueryErrorState } from "../../../_global/components/QueryErrorState";
import { getErrorMessage } from "../../../_global/helper/get-error-message";
import { useParticipants } from "../../hooks/participants/useParticipants";
import { Skeleton } from "../../../_global/components/Shimer";

interface DrawerParticipantsProps {
  show: boolean;
  onHide: () => void;
  classId: string;
  onInvite?: () => void;
  title?: string;
  position?: "left" | "right";
  // Human-readable name used only for the export file name. The drawer
  // title stays generic; without this, every class exports the same
  // file name on the same day.
  exportName?: string;
}

// File name from the drawer title plus today's date, safe for every OS:
// anything that is not a letter or digit collapses to a dash.
const buildExportFileName = (title: string): string => {
  const slug =
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "participants";
  const date = new Date().toISOString().slice(0, 10);
  return `${slug}-${date}.xlsx`;
};

export const DrawerParticipants: React.FC<DrawerParticipantsProps> = ({
  show,
  onHide,
  onInvite,
  title = "Class Participants",
  position = "right",
  exportName,
  classId,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isExporting, setIsExporting] = React.useState(false);

  const { data: participants, isFetching, isError, refetch } = useParticipants({
    path: `participant/${classId}`,
    search: searchQuery,
    enabled: show && !!classId,
  });

  const canExport =
    !isFetching && !isExporting && (participants?.data?.length ?? 0) > 0;

  // Exports the participants already loaded in this drawer — the
  // endpoint returns every participant in one response, so no extra
  // request is needed and nothing gets cut off. When a search filter
  // is active, the export matches the filtered list on screen.
  const handleExport = async () => {
    const rows = participants?.data ?? [];
    if (!rows.length) return;
    setIsExporting(true);
    try {
      // Lazy-loaded on purpose: SheetJS stays out of the initial bundle.
      const XLSX = await import("xlsx");
      const sheet = XLSX.utils.json_to_sheet(
        rows.map((participant) => ({
          Nama: participant.user.name,
          Email: participant.user.email,
          Role: participant.user.role,
        }))
      );
      const book = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(book, sheet, "Peserta");
      XLSX.writeFile(book, buildExportFileName(exportName || title));
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Drawer
      show={show}
      onHide={onHide}
      position={position}
      close={{ title: "back" }}
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
          <div className="mt-3">
            <Button
              variant={canExport ? "secondary" : "disabled"}
              onClick={handleExport}
            >
              <span className="flex items-center justify-center gap-2">
                <Download className="h-4 w-4" />
                {isExporting ? "Exporting..." : "Export XLSX"}
              </span>
            </Button>
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
          ) : isError && !participants?.data ? (
            <QueryErrorState
              customMinHeight={200}
              description={[
                "Failed to load participants.",
                "Please check your connection and try again.",
              ]}
              onRetry={refetch}
            />
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
