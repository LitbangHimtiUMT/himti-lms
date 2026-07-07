import { FaUsers, FaBookOpen } from "react-icons/fa";
import Learning from "@core/assets/learning-assets.jpg";
import DefaultImg from "@core/assets/default-photo.svg";
import { ClassModel } from "@core/model/classes";
import { formatRupiah } from "../../../_global/helper";
import { useNavigate } from "react-router-dom";
import { Poppins } from "../../../_global/components/Text";

export const ClassCard: React.FC<{ course: ClassModel }> = ({ course }) => {
  const navigate = useNavigate();

  return (
    <div className="group bg-white border border-slate-200/80 hover:border-[#2b6394]/40 rounded-2xl p-4 w-full max-w-sm flex flex-col justify-between hover:shadow-[0_8px_30px_rgba(43,99,148,0.06)] transition-all duration-300">
      <div>
        {/* Thumbnail Section */}
        <div className="relative overflow-hidden rounded-xl aspect-[330/223] mb-4 bg-slate-100">
          <img
            src={course.thumbnail || Learning}
            onError={(e) => ((e.target as HTMLImageElement).src = DefaultImg)}
            alt={course.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute top-3 left-3 bg-yellow-500 text-slate-900 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider backdrop-blur-sm shadow-sm">
            {course.status}
          </span>
        </div>

        {/* Content Section */}
        <div className="px-1">
          <Poppins className="text-[#2b6394] font-bold text-xs uppercase tracking-wider mb-1">
            {course.category.name}
          </Poppins>
          <h4 className="text-lg font-bold text-slate-850 group-hover:text-[#2b6394] transition-colors duration-200 line-clamp-2">
            <a href="#" onClick={(e) => { e.preventDefault(); navigate(`/class-detail/${course.id}`); }}>
              {course.name}
            </a>
          </h4>
          <p className="text-blue-600 font-extrabold text-lg mt-2">
            {formatRupiah(course.price)}
          </p>

          {/* Details Row */}
          <div className="flex items-center gap-6 text-slate-400 text-xs mt-3">
            <div className="flex items-center gap-1.5 hover:text-slate-500 transition-colors">
              <FaUsers size={14} className="text-[#2b6394]/80" /> 
              <span>{course.level}</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-slate-500 transition-colors">
              <FaBookOpen size={13} className="text-[#2b6394]/80" /> 
              <span>{course.category.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={course.creator.photo}
            onError={(e) => ((e.target as HTMLImageElement).src = DefaultImg)}
            className="w-8 h-8 rounded-full border border-slate-200 object-cover"
          />
          <span className="text-xs font-semibold text-slate-600">{course.creator.name}</span>
        </div>
        <div>
          <button 
            onClick={() => navigate(`/class-detail/${course.id}`)}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#f1c857] to-[#2b6394] text-white font-semibold text-xs shadow-sm hover:opacity-90 transition-opacity duration-200"
          >
            Lihat Detail
          </button>
        </div>
      </div>
    </div>
  );
};
