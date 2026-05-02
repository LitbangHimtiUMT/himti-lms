// import React from "react";
import DefaultPhoto from "@core/assets/default-photo.svg";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useMentors } from "../hooks/useMentors";
import { Skeleton } from "../../_global/components/Shimer";

const MentorGrid = () => {
  const { data: mentors, isFetching } = useMentors();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {isFetching || !mentors?.data ? (
          <>
            <Skeleton width={"370px"} height={"450px"} />
            <Skeleton width={"370px"} height={"450px"} />
            <Skeleton width={"370px"} height={"450px"} />
          </>
        ) : (
          (mentors?.data ?? [])?.map((mentor) => (
            <div
              key={mentor.id}
              className={`relative rounded-3xl overflow-hidden group shadow-[0_1px_14px_rgba(0,0,0,0.1)]`}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <div className="w-full bg-white object-cover object-center transition-transform duration-500 group-hover:scale-110">
                  <img
                    src={mentor.photo || DefaultPhoto}
                    alt={mentor.name}
                    className="w-full h-full"
                  />
                </div>
              </div>
              <div className="absolute top-0 right-0 bottom-0 w-16 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  className={`w-10 h-10 rounded-full shadow-md flex items-center justify-center ${
                    mentor.facebook
                      ? "text-orange-600 hover:bg-orange-600 bg-white cursor-pointer"
                      : "text-white bg-gray-500 cursor-default"
                  } hover:text-white transition-colors`}
                >
                  <FaFacebook className="w-5 h-5 text-inherit" />
                </button>
                <button
                  className={`w-10 h-10 rounded-full shadow-md flex items-center justify-center ${
                    mentor.twitter
                      ? "text-orange-600 hover:bg-orange-600 bg-white cursor-pointer"
                      : "text-white bg-gray-500 cursor-default"
                  } hover:text-white transition-colors`}
                >
                  <FaTwitter className="w-5 h-5 text-inherit" />
                </button>
                <button
                  className={`w-10 h-10 rounded-full shadow-md flex items-center justify-center ${
                    mentor.linkedin
                      ? "text-orange-600 hover:bg-orange-600 bg-white cursor-pointer"
                      : "text-white bg-gray-500 cursor-default"
                  } hover:text-white transition-colors`}
                >
                  <FaLinkedin className="w-5 h-5 text-inherit" />
                </button>
                <button
                  className={`w-10 h-10 rounded-full shadow-md flex items-center justify-center ${
                    mentor.instagram
                      ? "text-orange-600 hover:bg-orange-600 bg-white cursor-pointer"
                      : "text-white bg-gray-500 cursor-default"
                  } hover:text-white transition-colors`}
                >
                  <FaInstagram className="w-5 h-5 text-inherit" />
                </button>
              </div>
              <div className="absolute bottom-2 left-4 right-4">
                <div className="bg-white rounded-2xl p-6 shadow-[0_1px_10px_rgba(0,0,0,0.1)]">
                  <h3 className="font-semibold text-xl text-gray-900 mb-1">
                    {mentor.name}
                  </h3>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MentorGrid;
