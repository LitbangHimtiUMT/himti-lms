// import React from "react";
import DefaultPhoto from "@core/assets/default-photo.svg";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

interface Mentor {
  id: number;
  name: string;
  role: string;
  bgColor: string;
}

const MentorGrid = () => {
  const mentors: Mentor[] = [
    {
      id: 1,
      name: "Cameron Williamson",
      role: "Web Developer",
      bgColor: "bg-white",
    },
    {
      id: 2,
      name: "Emily Carter",
      role: "Web Developer",
      bgColor: "bg-white",
    },
    {
      id: 3,
      name: "Liam Johnson",
      role: "Web Developer",
      bgColor: "bg-white",
    },
    {
      id: 4,
      name: "Noah Brown",
      role: "Web Developer",
      bgColor: "bg-white",
    },
    {
      id: 5,
      name: "Sophia Martinez",
      role: "Web Developer",
      bgColor: "bg-white",
    },
    {
      id: 6,
      name: "Mason Wilson",
      role: "Web Developer",
      bgColor: "bg-white",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {mentors.map((mentor) => (
          <div
            key={mentor.id}
            className={`relative rounded-3xl overflow-hidden group ${mentor.bgColor} shadow-[0_1px_14px_rgba(0,0,0,0.1)]`}
          >
            <div className="aspect-[4/5] overflow-hidden">
              <div className="w-full bg-white object-cover object-center transition-transform duration-500 group-hover:scale-110">
                <img
                  src={DefaultPhoto}
                  alt={mentor.name}
                  className="w-full h-full"
                />
              </div>
            </div>
            <div className="absolute top-0 right-0 bottom-0 w-16 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-orange-600 hover:bg-orange-600 hover:text-white transition-colors">
                <FaFacebook className="w-5 h-5 text-inherit" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-orange-600 hover:bg-orange-600 hover:text-white transition-colors">
                <FaTwitter className="w-5 h-5 text-inherit" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-orange-600 hover:bg-orange-600 hover:text-white transition-colors">
                <FaLinkedin className="w-5 h-5 text-inherit" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-orange-600 hover:bg-orange-600 hover:text-white transition-colors">
                <FaInstagram className="w-5 h-5 text-inherit" />
              </button>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white rounded-2xl p-6 shadow-[0_1px_10px_rgba(0,0,0,0.1)]">
                <h3 className="font-semibold text-xl text-gray-900 mb-1">
                  {mentor.name}
                </h3>
                <p className="text-gray-600">{mentor.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorGrid;
