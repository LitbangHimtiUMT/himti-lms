import { FiAward, FiBookOpen, FiChevronRight, FiClock, FiUsers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Badge } from "../../../_global/components/Badge";
import { EmptyState } from "../../../_global/components/Empty";
import { QueryErrorState } from "../../../_global/components/QueryErrorState";
import { Skeleton } from "../../../_global/components/Shimer";
import { formatTime } from "../../../_global/lib/format-time";
import { useDashboardStats } from "../../hooks/dashboard/useDashboardStats";

const summaryCards = [
  {
    key: "classes",
    label: "Total Kelas",
    icon: <FiBookOpen className="text-lg" />,
    iconClassName:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  },
  {
    key: "participants",
    label: "Total Peserta",
    icon: <FiUsers className="text-lg" />,
    iconClassName:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
  },
  {
    key: "pendingReviews",
    label: "Menunggu Review",
    icon: <FiClock className="text-lg" />,
    iconClassName:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  },
  {
    key: "certificates",
    label: "Sertifikat Terbit",
    icon: <FiAward className="text-lg" />,
    iconClassName:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  },
] as const;

export const MentorDashboardStats = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useDashboardStats();
  const stats = data?.data;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Skeleton width="100%" height="96px" />
          <Skeleton width="100%" height="96px" />
          <Skeleton width="100%" height="96px" />
          <Skeleton width="100%" height="96px" />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
          <div className="xl:col-span-2">
            <Skeleton width="100%" height="220px" />
          </div>
          <div className="xl:col-span-3">
            <Skeleton width="100%" height="220px" />
          </div>
        </div>
      </div>
    );
  }

  if (isError && !stats) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <QueryErrorState
          description={[
            "Gagal memuat statistik.",
            "Periksa koneksi lalu coba lagi.",
          ]}
          retryLabel="Coba Lagi"
          customMinHeight="200px"
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card) => (
          <div
            key={card.key}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-4 flex flex-col gap-3"
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.iconClassName}`}
            >
              {card.icon}
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.totals[card.key]}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {card.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
        <div className="xl:col-span-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Perlu Review
          </h2>
          {stats.reviewQueue.length ? (
            <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
              {stats.reviewQueue.map((item) => (
                <button
                  key={item.submissionId}
                  type="button"
                  onClick={() =>
                    navigate(
                      `/dashboard/${item.classId}/${item.sessionId}/${item.moduleId}/${item.assignmentId}`
                    )
                  }
                  className="w-full text-left py-3 first:pt-0 last:pb-0 flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-gray-900 dark:text-white truncate">
                      {item.participantName}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {item.assignmentTitle} · {item.className}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-500">
                      {formatTime(new Date(item.submittedAt))}
                    </div>
                  </div>
                  <FiChevronRight className="shrink-0 text-gray-400 dark:text-gray-500" />
                </button>
              ))}
            </div>
          ) : (
            <EmptyState
              variant="archive"
              customMinHeight="120px"
              description={["Belum ada submission yang menunggu review."]}
            />
          )}
        </div>

        <div className="xl:col-span-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Ringkasan per Kelas
          </h2>
          {stats.perClass.length ? (
            <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
              {stats.perClass.map((item) => (
                <div key={item.id} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-medium text-gray-900 dark:text-white truncate">
                        {item.name}
                      </span>
                      <Badge
                        size="sm"
                        variant={
                          item.status === "PUBLISH"
                            ? "success"
                            : item.status === "ARCHIVED"
                            ? "warning"
                            : "outline"
                        }
                        className="capitalize"
                      >
                        {item.status.toLowerCase()}
                      </Badge>
                      {item.completedAt && (
                        <Badge size="sm" variant="primary">
                          Completed
                        </Badge>
                      )}
                    </div>
                    <span className="shrink-0 text-sm font-medium text-gray-700 dark:text-gray-300">
                      {item.avgProgress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-1">
                    <div
                      className="bg-indigo-500 h-2 rounded-full"
                      style={{ width: `${item.avgProgress}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {item.participants} peserta · {item.pendingReviews} menunggu
                    review
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              variant="default"
              customMinHeight="120px"
              description={["Belum ada kelas."]}
            />
          )}
        </div>
      </div>
    </div>
  );
};
