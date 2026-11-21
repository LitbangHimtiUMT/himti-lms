import DefaultPhoto from "@core/assets/default-photo.svg";
import { CiSearch } from "react-icons/ci";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { useMentors } from "../hooks/useMentors";
import { Input } from "../../_global/components/Input";
import { Skeleton } from "../../_global/components/Shimer";
import { Pagination } from "../../_global/components/Pagination";
import { QueryErrorState } from "../../_global/components/QueryErrorState";
import { Poppins } from "../../_global/components/Text";
import { useSearchParamsInput } from "../../_global/hooks/useSearchParamsInput";

const MentorCard = ({ mentor }: { mentor: any }) => {
  return (
    <div className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/80 hover:border-[#2b6394]/30 shadow-sm hover:shadow-[0_16px_48px_rgba(43,99,148,0.10)] transition-all duration-500 flex flex-col">
      {/* Photo */}
      <div className="relative aspect-[4/4] w-full overflow-hidden bg-slate-100">
        <img
          src={mentor.photo || DefaultPhoto}
          alt={mentor.name}
          onError={(e) => ((e.target as HTMLImageElement).src = DefaultPhoto)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f2d]/85 via-[#0d1f2d]/20 to-transparent" />

        {/* Social icons — revealed on hover */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-400 ease-out">
          {[
            { href: mentor.facebook, icon: <FaFacebook size={14} />, color: "hover:bg-[#1877f2]" },
            { href: mentor.twitter, icon: <FaTwitter size={14} />, color: "hover:bg-[#1da1f2]" },
            { href: mentor.linkedin, icon: <FaLinkedin size={14} />, color: "hover:bg-[#0077b5]" },
            { href: mentor.instagram, icon: <FaInstagram size={14} />, color: "hover:bg-gradient-to-br from-pink-500 to-orange-500" },
          ].map((s, i) => (
            <a
              key={i}
              href={s.href || "#"}
              onClick={(e) => !s.href && e.preventDefault()}
              style={{ transitionDelay: `${i * 40}ms` }}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 text-white
                ${s.href
                  ? `bg-white/20 backdrop-blur-sm border border-white/30 ${s.color} hover:text-white hover:border-transparent hover:scale-110 cursor-pointer`
                  : "bg-white/10 border border-white/10 cursor-not-allowed opacity-40 pointer-events-none"
                }`}
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Name overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <Poppins className="text-[10px] text-[#f1c857] font-bold uppercase tracking-widest mb-0.5">
            Expert Instructor
          </Poppins>
          <h3 className="text-white font-extrabold text-lg leading-tight tracking-wide">
            {mentor.name}
          </h3>
        </div>
      </div>

      {/* Footer: email + badge */}
      <div className="px-5 py-4 flex items-center justify-between border-t border-slate-100 bg-white">
        {mentor.email ? (
          <a
            href={`mailto:${mentor.email}`}
            className="flex items-center gap-2 text-slate-500 hover:text-[#2b6394] transition-colors text-xs group/email"
          >
            <FaEnvelope size={12} className="group-hover/email:scale-110 transition-transform" />
            <span className="truncate max-w-[160px]">{mentor.email}</span>
          </a>
        ) : (
          <span className="text-slate-300 text-xs italic">-</span>
        )}
        <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#2b6394] to-[#1a3a5c] px-2.5 py-1 rounded-full">
          Mentor
        </span>
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  // Same shell as MentorCard below, with the name overlay moved
  // back INSIDE the photo (absolute bottom-0, p-5) where the real
  // one lives — the old skeleton put it under the photo, so the
  // card ran ~490px against the real ~426px.
  <div className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-sm flex flex-col">
    <div className="relative aspect-[4/4] w-full overflow-hidden bg-slate-100">
      <Skeleton width="100%" height="100%" borderRadius="0" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f2d]/85 via-[#0d1f2d]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <Skeleton width="33%" height="1rem" className="mb-0.5" />
        <Skeleton width="66%" height="1.375rem" />
      </div>
    </div>
    <div className="px-5 py-4 flex items-center justify-between border-t border-slate-100 bg-white">
      <Skeleton width="50%" height="1rem" />
      <Skeleton width="4rem" height="1.5rem" borderRadius="9999px" />
    </div>
  </div>
);

const MentorGrid = () => {
  const { data: mentors, isLoading, isFetching, isError, refetch } =
    useMentors();

  // Skeleton only before the first load: paging/search refetches keep
  // the cached cards on screen instead of swapping in skeletons.
  const isLoadingMentors =
    isLoading || (isFetching && !mentors?.data);
  const {
    value: search,
    handleInputChange: handleSearch,
    queries,
    setSearchParams,
  } = useSearchParamsInput("search");

  const handleChangePage = (page: number) =>
    setSearchParams({ ...queries, page: String(page) });

  return (
    <div>
      <div className="flex justify-end mb-6">
        <div className="w-full md:w-64">
          <Input
            LeftIcon={<CiSearch className="text-lg text-gray-400" />}
            placeholder="Search mentors..."
            onChange={handleSearch}
            className="bg-white w-full"
          />
        </div>
      </div>
      {isLoadingMentors ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : isError && !mentors?.data ? (
        <QueryErrorState
          description={[
            "Gagal Memuat Mentor",
            "Periksa koneksi Anda lalu coba lagi.",
          ]}
          retryLabel="Coba Lagi"
          onRetry={refetch}
        />
      ) : !mentors?.data?.length ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
            <FaEnvelope className="text-slate-300" size={24} />
          </div>
          <Poppins className="text-lg font-semibold text-slate-600">
            {search ? "Mentor Tidak Ditemukan" : "Belum Ada Mentor"}
          </Poppins>
          <p className="text-slate-400 text-sm max-w-xs">
            {search
              ? "Tidak ada mentor yang cocok dengan pencarian. Coba kata kunci lain."
              : "Mentor belum tersedia saat ini. Silakan kunjungi kembali nanti."}
          </p>
        </div>
      ) : (
        <>
          {/* Total mentor count */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm text-slate-500">
              Menampilkan{" "}
              <span className="font-bold text-[#2b6394]">{mentors.data.length}</span>{" "}
              dari{" "}
              <span className="font-bold text-[#2b6394]">
                {mentors.meta?.totalData ?? mentors.data.length}
              </span>{" "}
              mentor
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentors.data.map((mentor: any) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        </>
      )}
      <Pagination
        totalPages={mentors?.meta?.totalPages || 1}
        currentPage={mentors?.meta?.page || 1}
        onPageChange={handleChangePage}
      />
    </div>
  );
};

export default MentorGrid;
