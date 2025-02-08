import { Users, BookOpen } from "lucide-react";
import Learning from "@core/assets/learning-assets.jpg";
import DefaultImg from "@core/assets/default-image.png";
import { ClassModel } from "@core/model/classes";

export const ClassCard: React.FC<{ course: ClassModel }> = ({ course }) => {
  return (
    <div className="bg-white rounded-xl shadow-xl p-4 max-w-sm">
      <div className="relative">
        <div className="relative overflow-hidden rounded-[10px] mb-[24px]">
          <img
            src={Learning}
            alt={course.name}
            className="aspect-[330/223] w-full object-cover transform transition-transform duration-300 hover:scale-110"
          />
          <span className="absolute top-4 left-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-md font-bold">
            🕒 {course.status}
          </span>
        </div>
      </div>
      <div className="mt-3">
        <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-md font-semibold">
          Expert
        </span>
        <h4 className="mt-2 text-lg font-semibold">
          <a href="#" className="hover:text-yellow-800">
            {course.name}
          </a>
        </h4>
        <p className="text-purple-600 font-bold text-lg mt-1">{course.price}</p>
        <div className="flex items-center gap-10 text-gray-500 text-sm mt-2">
          <div className="flex items-center gap-1">
            <Users size={16} /> {course.level}
          </div>
          <div className="flex items-center gap-1">
            <BookOpen size={16} /> {course.category.name}
          </div>
        </div>
        <div className="border-t border-gray-400 my-5"></div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={DefaultImg}
              alt={course.creator.photo}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium">{course.creator.name}</span>
          </div>
          <button className="bg-blue-500 text-white px-3 py-1 rounded-md">
            See Detail
          </button>
        </div>
      </div>
    </div>
  );
};
