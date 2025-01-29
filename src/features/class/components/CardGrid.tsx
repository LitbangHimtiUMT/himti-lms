import React from "react";
import { Users, BookOpen } from "lucide-react";
import Learning from "@core/assets/learning-assets.jpg";
import DefaultImg from "@core/assets/default-image.png";

interface Class {
  title: string;
  price: string;
  duration: string;
  students: number;
  lessons: number;
  instructor: string;
  rating: number;
  image: string;
}

const courses: Class[] = Array(9).fill({
  title: "Financial Analyst Training & Investing Class",
  price: "Rp 150.000",
  duration: "8h 30m",
  students: 169,
  lessons: 12,
  instructor: "Jane Cooper",
  rating: 4,
  image: "https://source.unsplash.com/400x300/?students,learning",
});

const ClassCard: React.FC<{ course: Class }> = ({ course }) => {
  return (
    <div className="bg-white rounded-xl shadow-xl p-4 max-w-sm">
      <div className="relative">
        <div className="relative overflow-hidden rounded-[10px] mb-[24px]">
          <img
            src={Learning}
            alt={course.title}
            className="aspect-[330/223] w-full object-cover transform transition-transform duration-300 hover:scale-110"
          />
          <span className="absolute top-4 left-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-md font-bold">
            🕒 {course.duration}
          </span>
        </div>
      </div>
      <div className="mt-3">
        <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-md font-semibold">
          Expert
        </span>
        <h4 className="mt-2 text-lg font-semibold">
          <a href="#" className="hover:text-yellow-800">
            {course.title}
          </a>
        </h4>
        <p className="text-purple-600 font-bold text-lg mt-1">{course.price}</p>
        <div className="flex items-center gap-10 text-gray-500 text-sm mt-2">
          <div className="flex items-center gap-1">
            <Users size={16} /> {course.students} Students
          </div>
          <div className="flex items-center gap-1">
            <BookOpen size={16} /> {course.lessons} Lesson
          </div>
        </div>
        <div className="border-t border-gray-400 my-5"></div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={DefaultImg}
              alt={course.instructor}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium">{course.instructor}</span>
          </div>
          <button className="bg-blue-500 text-white px-3 py-1 rounded-md">
            See Detail
          </button>
        </div>
      </div>
    </div>
  );
};

const ClassGrid: React.FC = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {courses.map((course, index) => (
          <ClassCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default ClassGrid;
