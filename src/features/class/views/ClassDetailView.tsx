import { useDetailClass } from "../hooks/useClasses";
import { useNavigate } from "react-router-dom";
import DefaultImage from "@core/assets/default-photo.svg";
import { Poppins } from "../../_global/components/Text";
import { Button } from "../../_global/components/Button";
import {
  FaUsers,
  FaUserTie,
  FaLayerGroup,
  FaCalendarAlt,
  FaArrowLeft,
  FaTag,
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

export const ClassDetailView = () => {
  const navigate = useNavigate();
  const { data: res, isFetching } = useDetailClass("id");
  const course = res?.data;

  if (isFetching) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 animate-pulse">
        <div className="h-10 bg-slate-200 rounded w-1/3 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="aspect-video bg-slate-200 rounded-2xl" />
            <div className="h-8 bg-slate-200 rounded w-2/3" />
            <div className="h-4 bg-slate-200 rounded w-full" />
            <div className="h-4 bg-slate-200 rounded w-5/6" />
            <div className="h-4 bg-slate-200 rounded w-4/6" />
          </div>
          <div className="h-64 bg-slate-200 rounded-2xl" />
        </div>
      </div>
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
            {course.status === "PUBLISH" && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500 text-white">
                Dipublikasikan
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
          <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col items-center gap-2 text-center">
              <FaUsers className="text-[#2b6394]" size={20} />
              <p className="text-2xl font-bold text-slate-800">{course.totalParticipant ?? 0}</p>
              <p className="text-xs text-slate-500">Peserta</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col items-center gap-2 text-center">
              <FaUserTie className="text-[#2b6394]" size={20} />
              <p className="text-2xl font-bold text-slate-800">{(course as any).totalMentor ?? 1}</p>
              <p className="text-xs text-slate-500">Mentor</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col items-center gap-2 text-center">
              <FaLayerGroup className="text-[#2b6394]" size={20} />
              <p className="text-2xl font-bold text-slate-800">{course.totalSession ?? 0}</p>
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
                    <span className="font-semibold">{course.totalSession ?? 0}</span>
                  </li>
                  <li className="flex justify-between py-2 items-center">
                    <span className="text-slate-500">Tanggal Dibuat</span>
                    <span className="font-semibold text-xs text-right">
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt size={11} className="text-[#2b6394]" />
                        {(course as any).createdAt ?? "-"}
                      </span>
                    </span>
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
                  ) : (
                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={() => navigate("/sign-in")}
                    >
                      Daftar Kelas
                    </Button>
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
