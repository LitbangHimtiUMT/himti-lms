import React from "react";
import { FaUser } from "react-icons/fa";

interface CardInstructorProps {
  userName: string;
}

export const CardInstructor: React.FC<CardInstructorProps> = ({ userName }) => {
  return (
    <>
      <div className="space-y-6">
        {/* Instructor Info */}
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Instructor</h3>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <FaUser className="text-gray-500" />
            </div>
            <div>
              <p className="font-medium">{userName}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
