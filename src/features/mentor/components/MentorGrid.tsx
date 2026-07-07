import DefaultPhoto from "@core/assets/default-photo.svg";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { useMentors } from "../hooks/useMentors";
import { Poppins } from "../../_global/components/Text";

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
  <div className="rounded-2xl overflow-hidden bg-white border border-slate-200/80 animate-pulse">
    <div className="aspect-[4/4] w-full bg-slate-200/80" />
    <div className="p-5 space-y-3">
      <div className="h-3 bg-slate-200 rounded w-1/3" />
      <div className="h-5 bg-slate-200 rounded w-2/3" />
    </div>
    <div className="px-5 py-4 border-t border-slate-100 flex justify-between">
      <div className="h-3 bg-slate-200 rounded w-1/2" />
      <div className="h-5 bg-slate-200 rounded-full w-16" />
    </div>
  </div>
);

const MentorGrid = () => {
  const { data: mentors, isFetching } = useMentors();

  return (
    <div>
      {isFetching ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : !mentors?.data?.length ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
            <FaEnvelope className="text-slate-300" size={24} />
          </div>
          <Poppins className="text-lg font-semibold text-slate-600">Belum Ada Mentor</Poppins>
          <p className="text-slate-400 text-sm max-w-xs">
            Mentor belum tersedia saat ini. Silakan kunjungi kembali nanti.
          </p>
        </div>
      ) : (
        <>
          {/* Total mentor count */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm text-slate-500">
              Menampilkan{" "}
              <span className="font-bold text-[#2b6394]">{mentors.data.length}</span>{" "}
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
    </div>
  );
};

export default MentorGrid;
