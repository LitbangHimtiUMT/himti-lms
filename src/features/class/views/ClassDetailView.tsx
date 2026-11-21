import { useDetailClass } from "../hooks/useClasses";
import { ClassReviewsSection } from "../components/ClassReviewsSection";
import { useSession } from "../../authentication/hooks/useSession";
import { useProfile } from "../../profile/useProfile";
import { useCertificateEligibility } from "../../certificates/hooks/useCertificateEligibility";
import { useGenerateCertificate } from "../../dashboard/hooks/certificates/useGenerateCertificate";
import { useNavigate } from "react-router-dom";
import DefaultImage from "@core/assets/default-photo.svg";
import { CONFIG_APP } from "@core/configs/app";
import { StatusClasses } from "@core/model/classes";
import { EligibilityAssignmentStatus } from "@core/model/certificates";
import { Poppins } from "../../_global/components/Text";
import { Badge, BadgeVariant } from "../../_global/components/Badge";
import { Button } from "../../_global/components/Button";
import { QueryErrorState } from "../../_global/components/QueryErrorState";
import { Skeleton } from "../../_global/components/Shimer";
import {
  FaUsers,
  FaLayerGroup,
  FaArrowLeft,
  FaTag,
  FaEye,
} from "react-icons/fa";
import { formatRupiah } from "../../_global/helper";

const levelLabel: Record<string, string> = {
  BEGINNER: "Pemula",
  INTERMEDIATE: "Menengah",
  EXPERT: "Ahli",
};

const levelColor: Record<string, string> = {
  BEGINNER: "bg-emerald-100 text-emerald-700",
  INTERMEDIATE: "bg-amber-100 text-amber-700",
  EXPERT: "bg-rose-100 text-rose-700",
};

const statusLabel: Record<StatusClasses, string> = {
  PUBLISH: "Dipublikasikan",
  DRAFT: "Draf",
  ARCHIVED: "Diarsipkan",
};

const statusPill: Record<StatusClasses, string> = {
  PUBLISH: "bg-emerald-500 text-white",
  DRAFT: "bg-slate-400 text-white",
  ARCHIVED: "bg-amber-500 text-white",
};

const eligibilityStatusLabel: Record<EligibilityAssignmentStatus, string> = {
  APPROVED: "Disetujui",
  REVIEW: "Menunggu review",
  REJECT: "Ditolak",
  NONE: "Belum dikumpulkan",
};

const eligibilityStatusVariant: Record<
  EligibilityAssignmentStatus,
  BadgeVariant
> = {
  APPROVED: "success",
  REVIEW: "warning",
  REJECT: "danger",
  NONE: "outline",
};

export const ClassDetailView = () => {
  const navigate = useNavigate();
  const { data: res, isLoading, isFetching, isError, refetch } =
    useDetailClass("id");
  const { isAuthenticated, isLoading: isSessionLoading } = useSession();
  const { data: profile } = useProfile();
  const course = res?.data;

  // Same creator check as the invitation page. useProfile shares the
  // navbar's cached query, so this adds no request.
  const isCreator = course?.creator?.id === profile?.data?.id;

  // Eligibility is meaningful for enrolled participants and for
  // class mentors (the creator and co-mentors): the creator is a
  // mentor, so there is no creator exclusion. The server decides
  // which claim path applies from the caller's relation to the
  // class. Guests get no request.
  const { data: eligibility, isLoading: isEligibilityLoading } =
    useCertificateEligibility(
      course?.id,
      !!course?.isAlreadyJoin || !!course?.isClassMentor
    );
  const generateCertificate = useGenerateCertificate();

  // The mentor path never renders the assignment meter: the server
  // returns an empty assignment list for mentors, and mentor
  // eligibility depends only on class completion and sessions. A
  // response without a role (older API) falls through to the
  // participant variant, preserving the previous behavior.
  const isMentorPath = eligibility?.data?.role === "PEMATERI";

  // The held certificate's code, captured in a const so the View
  // button's onClick closure can use it: narrowing of
  // eligibility.data does not survive into callbacks.
  const certificateCode = eligibility?.data?.certificateCode;

  // Skeleton only before the first load: a background refetch keeps
  // the loaded page on screen instead of swapping in the skeleton.
  // Every block mirrors the real page below (same wrappers, same
  // spacing, same heights): the full-bleed hero, the 3-column grid,
  // the left sections and the enrollment card.
  if (isLoading || (isFetching && !res?.data)) {
    return (
      <div className="font-sans text-gray-800">
        {/* Hero: same full-bleed h-[320px] md:h-[400px] block, with
            the overlay content (back link, pills, title) at the
            bottom, px-6 pb-10 md:px-16 */}
        <div className="relative h-[320px] md:h-[400px] overflow-hidden">
          <Skeleton width="100%" height="100%" borderRadius="0" />
          <div className="absolute inset-0 flex flex-col justify-end px-6 pb-10 md:px-16">
            <Skeleton width="8rem" height="1.25rem" className="mb-4" />
            <div className="flex flex-wrap gap-2 mb-2">
              <Skeleton width="5rem" height="1.5rem" borderRadius="9999px" />
              <Skeleton width="7rem" height="1.5rem" borderRadius="9999px" />
              <Skeleton width="6rem" height="1.5rem" borderRadius="9999px" />
            </div>
            <div className="h-11 md:h-12 w-2/3 max-w-3xl">
              <Skeleton width="100%" height="100%" />
            </div>
          </div>
        </div>

        {/* Main content: same max-w-6xl, py-12, lg:grid-cols-3 gap-10 */}
        <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: same lg:col-span-2 space-y-10 */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description: h2 (text-xl) + 3 text lines */}
            <section>
              <div className="mb-3 border-b border-slate-100 pb-2">
                <Skeleton width="10rem" height="1.75rem" />
              </div>
              <div className="space-y-1">
                <Skeleton width="100%" height="1rem" />
                <Skeleton width="83.33%" height="1rem" />
                <Skeleton width="66.67%" height="1rem" />
              </div>
            </section>

            {/* Stats: 3 cards, same p-4 flex-col gap-2 shape
                (icon 20px + number text-2xl + label text-xs = 116px) */}
            <section className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col items-center gap-2"
                >
                  <Skeleton width="1.25rem" height="1.25rem" />
                  <Skeleton width="3rem" height="2rem" />
                  <Skeleton width="4rem" height="1rem" />
                </div>
              ))}
            </section>

            {/* Certificate section placeholder: title + 2 lines +
                2 assignment rows (px-4 py-3, title + module + badge) */}
            <section>
              <div className="mb-3 border-b border-slate-100 pb-2">
                <Skeleton width="14rem" height="1.75rem" />
              </div>
              <Skeleton width="100%" height="1.25rem" className="mb-3" />
              <Skeleton width="16rem" height="1.25rem" className="mb-3" />
              <ul className="space-y-2">
                {[0, 1].map((i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3"
                  >
                    <div className="space-y-1">
                      <Skeleton width="10rem" height="1.25rem" />
                      <Skeleton width="6rem" height="1rem" />
                    </div>
                    <Skeleton width="4rem" height="1.5rem" borderRadius="9999px" className="shrink-0" />
                  </li>
                ))}
              </ul>
            </section>

            {/* Reviews placeholder: title + aggregate row + 2 cards
                (avatar 40px + name/date + stars + 2 text lines) */}
            <section>
              <div className="mb-3 border-b border-slate-100 pb-2">
                <Skeleton width="12rem" height="1.75rem" />
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Skeleton width="1.25rem" height="1.25rem" borderRadius="9999px" />
                <Skeleton width="2.5rem" height="1.75rem" />
                <Skeleton width="7rem" height="1.25rem" />
              </div>
              <ul className="space-y-4">
                {[0, 1].map((i) => (
                  <li
                    key={i}
                    className="bg-slate-50 border border-slate-100 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Skeleton width="2.5rem" height="2.5rem" borderRadius="9999px" className="shrink-0" />
                      <div className="space-y-1">
                        <Skeleton width="8rem" height="1.25rem" />
                        <Skeleton width="6rem" height="1rem" />
                      </div>
                    </div>
                    <Skeleton width="5rem" height="1rem" />
                    <div className="mt-2 space-y-1">
                      <Skeleton width="100%" height="1rem" />
                      <Skeleton width="83.33%" height="1rem" />
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Instructor placeholder: title + card (avatar 56px) */}
            <section>
              <div className="mb-4 border-b border-slate-100 pb-2">
                <Skeleton width="12rem" height="1.75rem" />
              </div>
              <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 rounded-xl p-4">
                <Skeleton width="3.5rem" height="3.5rem" borderRadius="9999px" className="shrink-0" />
                <div className="space-y-1">
                  <Skeleton width="10rem" height="1.25rem" />
                  <Skeleton width="14rem" height="1rem" />
                </div>
              </div>
            </section>
          </div>

          {/* Right: enrollment card, same sticky + rounded-2xl shell.
              Thumb h-40 + p-5 (price text-2xl + 4 detail rows +
              2 md buttons at 32px each) = ~490px. */}
          <div className="col-span-1">
            <div className="sticky top-6">
              <div className="rounded-2xl border border-slate-200 shadow-lg bg-white overflow-hidden">
                <Skeleton width="100%" height="10rem" borderRadius="0" />
                <div className="p-5 space-y-4">
                  <Skeleton width="6rem" height="2rem" />
                  <ul className="space-y-2 divide-y divide-slate-100">
                    {[0, 1, 2, 3].map((i) => (
                      <li key={i} className="flex justify-between py-2">
                        <Skeleton width="4rem" height="1.25rem" />
                        <Skeleton width="5rem" height="1.25rem" />
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2 space-y-2">
                    <Skeleton width="100%" height="2rem" borderRadius="0.375rem" />
                    <Skeleton width="100%" height="2rem" borderRadius="0.375rem" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError && !course) {
    return (
      <QueryErrorState
        description={[
          "Gagal Memuat Kelas",
          "Periksa koneksi Anda lalu coba lagi.",
        ]}
        retryLabel="Coba Lagi"
        onRetry={refetch}
      />
    );
  }

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Poppins className="text-2xl font-bold text-slate-700">Kelas tidak ditemukan</Poppins>
        <Button variant="primary" onClick={() => navigate("/class")}>
          Kembali ke Daftar Kelas
        </Button>
      </div>
    );
  }

  return (
    <div className="font-sans text-gray-800">
      {/* Hero Banner */}
      <div className="relative h-[320px] md:h-[400px] overflow-hidden">
        <img
          src={course.thumbnail || DefaultImage}
          onError={(e) => ((e.target as HTMLImageElement).src = DefaultImage)}
          alt={course.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 flex flex-col justify-end px-6 pb-10 md:px-16">
          <button
            onClick={() => navigate("/class")}
            className="flex items-center gap-2 text-white/80 hover:text-white text-sm mb-4 w-fit transition-colors"
          >
            <FaArrowLeft size={13} />
            Kembali ke Kelas
          </button>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${levelColor[course.level] || "bg-slate-100 text-slate-700"}`}>
              {levelLabel[course.level] || course.level}
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#f1c857] text-slate-900">
              {course.category?.name}
            </span>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusPill[course.status]}`}>
              {statusLabel[course.status]}
            </span>
            {course.completedAt && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-600 text-white">
                Selesai
              </span>
            )}
          </div>
          <Poppins className="text-white text-2xl md:text-4xl font-bold leading-snug max-w-3xl">
            {course.name}
          </Poppins>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Description + Stats */}
        <div className="lg:col-span-2 space-y-10">
          {/* Description */}
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">
              Tentang Kelas
            </h2>
            <p className="text-slate-600 leading-relaxed whitespace-pre-line text-sm">
              {course.description}
            </p>
          </section>

          {/* Stats Row */}
          <section className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col items-center gap-2 text-center">
              <FaUsers className="text-[#2b6394]" size={20} />
              <p className="text-2xl font-bold text-slate-800">{course.totalParticipant ?? 0}</p>
              <p className="text-xs text-slate-500">Peserta</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col items-center gap-2 text-center">
              <FaLayerGroup className="text-[#2b6394]" size={20} />
              <p className="text-2xl font-bold text-slate-800">{course.sessions?.length ?? 0}</p>
              <p className="text-xs text-slate-500">Sesi</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col items-center gap-2 text-center">
              <FaTag className="text-[#2b6394]" size={20} />
              <p className="text-2xl font-bold text-slate-800 text-sm">
                {course.price === 0 ? "Gratis" : formatRupiah(course.price)}
              </p>
              <p className="text-xs text-slate-500">Harga</p>
            </div>
          </section>

          {/* Certificate section: assignment meter for participants,
              claim states for mentors (no assignment meter) */}
          {eligibility?.data ? (
            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">
                Progres Sertifikat
              </h2>
              {isMentorPath ? (
                <>
                  {eligibility.data.hasCertificate &&
                  certificateCode ? (
                    <>
                      <p className="text-sm text-slate-600 leading-relaxed mb-3">
                        Sertifikat pemateri Anda untuk kelas ini sudah terbit.
                      </p>
                      <div className="w-max">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() =>
                            window.open(
                              `${CONFIG_APP.BASE_URL}/lms/certificates/file?code=${certificateCode}`,
                              "_blank",
                              "noopener,noreferrer"
                            )
                          }
                        >
                          <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                            <FaEye className="shrink-0 text-gray-600 dark:text-gray-300" />
                            <Poppins>Lihat Sertifikat</Poppins>
                          </div>
                        </Button>
                      </div>
                    </>
                  ) : eligibility.data.eligible ? (
                    <>
                      <p className="text-sm text-slate-600 leading-relaxed mb-3">
                        Kelas sudah selesai. Klaim sertifikat pemateri Anda.
                      </p>
                      <div className="w-max">
                        <Button
                          size="sm"
                          variant={
                            generateCertificate.isPending
                              ? "disabled"
                              : "primary"
                          }
                          onClick={() =>
                            generateCertificate.mutate({ classId: course.id })
                          }
                        >
                          <span className="flex items-center justify-center whitespace-nowrap">
                            {generateCertificate.isPending
                              ? "Memproses..."
                              : "Klaim Sertifikat"}
                          </span>
                        </Button>
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Sertifikat pemateri bisa diklaim setelah kelas ditandai
                      selesai dan memiliki minimal satu sesi.
                    </p>
                  )}
                </>
              ) : (
                <>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                Sertifikat bisa diklaim setelah semua tugas disetujui mentor
                dan mentor menandai kelas selesai.
              </p>
              <p className="text-sm font-semibold text-slate-800 mb-3">
                Tugas disetujui {eligibility.data.approvedAssignments} dari{" "}
                {eligibility.data.totalAssignments}
              </p>
              {eligibility.data.totalAssignments > 0 &&
                eligibility.data.approvedAssignments ===
                  eligibility.data.totalAssignments &&
                eligibility.data.classCompleted === false && (
                  <p className="text-sm text-slate-500 mb-3">
                    Semua tugas sudah disetujui. Menunggu mentor menandai
                    kelas selesai.
                  </p>
                )}
              {eligibility.data.totalAssignments === 0 ? (
                <p className="text-sm text-slate-500">
                  Belum ada tugas di kelas ini.
                </p>
              ) : (
                <ul className="space-y-2">
                  {eligibility.data.assignments.map((assignment) => (
                    <li
                      key={assignment.id}
                      className="flex items-center justify-between gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3"
                    >
                      <div className="min-w-0">
                        <p className="font-medium text-slate-800 truncate">
                          {assignment.title}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {assignment.moduleName}
                        </p>
                      </div>
                      <Badge
                        size="sm"
                        variant={eligibilityStatusVariant[assignment.status]}
                      >
                        {eligibilityStatusLabel[assignment.status]}
                      </Badge>
                    </li>
                  ))}
                </ul>
              )}
                </>
              )}
            </section>
          ) : isEligibilityLoading &&
            (course?.isAlreadyJoin || course?.isClassMentor) ? (
            // Same spot as the real section, so the reviews and
            // instructor below it do not shift when eligibility lands.
            // Shape follows the caller's relation, which the course
            // already tells us: mentors get the compact variant
            // (title + line + sm button at 24px), participants the
            // meter + assignment rows. Guests get nothing: the hook
            // is disabled for them, so this branch never renders.
            <section aria-hidden="true">
              <div className="mb-3 border-b border-slate-100 pb-2">
                <Skeleton width="14rem" height="1.75rem" />
              </div>
              {course?.isClassMentor ? (
                <>
                  <Skeleton width="75%" height="1.25rem" className="mb-3" />
                  <div className="w-max">
                    <Skeleton width="8rem" height="1.5rem" borderRadius="0.375rem" />
                  </div>
                </>
              ) : (
                <>
                  <Skeleton width="100%" height="1.25rem" className="mb-3" />
                  <Skeleton width="16rem" height="1.25rem" className="mb-3" />
                  <ul className="space-y-2">
                    {[0, 1, 2].map((i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3"
                      >
                        <div className="space-y-1">
                          <Skeleton width="10rem" height="1.25rem" />
                          <Skeleton width="6rem" height="1rem" />
                        </div>
                        <Skeleton width="4rem" height="1.5rem" borderRadius="9999px" className="shrink-0" />
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </section>
          ) : null}

          {/* Reviews (certificate holders can review; hides itself
              when the API has no reviews endpoint yet) */}
          <ClassReviewsSection key={course.id} classId={course.id} />

          {/* Instructor */}
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">
              Instruktur / Pembuat
            </h2>
            <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 rounded-xl p-4">
              <img
                src={course.creator?.photo || DefaultImage}
                onError={(e) => ((e.target as HTMLImageElement).src = DefaultImage)}
                alt={course.creator?.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#2b6394]/20"
              />
              <div>
                <p className="font-semibold text-slate-800">{course.creator?.name}</p>
                <p className="text-sm text-slate-500">{course.creator?.email}</p>
              </div>
            </div>
          </section>
        </div>

        {/* Right: Enrollment Card */}
        <div className="col-span-1">
          <div className="sticky top-6">
            <div className="rounded-2xl border border-slate-200 shadow-lg bg-white overflow-hidden">
              {/* Thumbnail mini */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={course.thumbnail || DefaultImage}
                  onError={(e) => ((e.target as HTMLImageElement).src = DefaultImage)}
                  alt={course.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              <div className="p-5 space-y-4">
                {/* Price */}
                <p className="text-2xl font-extrabold text-[#2b6394]">
                  {course.price === 0 ? "Gratis" : formatRupiah(course.price)}
                </p>

                {/* Details List */}
                <ul className="space-y-2 text-sm text-slate-600 divide-y divide-slate-100">
                  <li className="flex justify-between py-2">
                    <span className="text-slate-500">Level</span>
                    <span className="font-semibold">{levelLabel[course.level] || course.level}</span>
                  </li>
                  <li className="flex justify-between py-2">
                    <span className="text-slate-500">Kategori</span>
                    <span className="font-semibold">{course.category?.name}</span>
                  </li>
                  <li className="flex justify-between py-2">
                    <span className="text-slate-500">Peserta</span>
                    <span className="font-semibold">{course.totalParticipant ?? 0} orang</span>
                  </li>
                  <li className="flex justify-between py-2">
                    <span className="text-slate-500">Total Sesi</span>
                    <span className="font-semibold">{course.sessions?.length ?? 0}</span>
                  </li>
                </ul>

                {/* CTA Button */}
                <div className="pt-2 space-y-2">
                  {course.isAlreadyJoin ? (
                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={() => navigate(`/learning/${course.id}`)}
                    >
                      Lanjut Belajar
                    </Button>
                  ) : isSessionLoading ? (
                    // md Button is 32px (px-3 py-1.5 text-sm), so the
                    // placeholder is h-8 in the same slot.
                    <Skeleton width="100%" height="2rem" borderRadius="0.375rem" />
                  ) : !isAuthenticated ? (
                    <>
                      <Button
                        variant="primary"
                        className="w-full"
                        onClick={() => navigate("/sign-in")}
                      >
                        Masuk
                      </Button>
                      <p className="text-xs text-slate-500 text-center leading-relaxed">
                        Pendaftaran kelas melalui link undangan dari mentor.
                      </p>
                    </>
                  ) : isCreator ? (
                    <p className="text-xs text-slate-500 text-center leading-relaxed">
                      Anda pembuat kelas ini. Peserta bergabung lewat link
                      undangan yang Anda bagikan.
                    </p>
                  ) : (
                    <p className="text-xs text-slate-500 text-center leading-relaxed">
                      Pendaftaran kelas melalui link undangan dari mentor.
                    </p>
                  )}
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => navigate("/class")}
                  >
                    Lihat Kelas Lain
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
