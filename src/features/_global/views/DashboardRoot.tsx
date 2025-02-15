// import { Outlet } from "react-router-dom";
// import { Sidebar } from "../components/Sidebar";
// import { Footer } from "../components/Footer";

// export const DashboardRoot = () => {
//   return (
//     <>
//       <div>
//         <Sidebar />
//         <Outlet />
//       </div>
//       <Footer />
//     </>
//   );
// };

// App.jsx
import { useState } from "react";
import {
  IoBookOutline,
  IoChevronBack,
  IoMenuOutline,
  IoNotificationsOutline,
} from "react-icons/io5";

export const DashboardRoot = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-gray-100">
      {/* Sidebar */}
      <Navbar />

      <div className="flex relative">
        <div
          className={`fixed top-18 left-0 transform lg:relative lg:ml-4 lg:mt-4 lg:translate-x-0 transition duration-200 ease-in-out z-30
          ${
            sidebarOpen ? "translate-x-4" : "-translate-x-full lg:translate-x-0"
          }
        `}
        >
          <Sidebar />
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden fixed top-3 left-[100%] z-50 p-2 rounded-e-2xl bg-white shadow-xl"
          >
            <IoMenuOutline className="w-4 h-4" />
          </button>
        </div>
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <h1 className="text-3xl font-bold m-4 lg:m-6">Dashboard</h1>
          <main className="flex-1 m-4 lg:m-6 overflow-x-hidden rounded-lg">
            <AssignmentTable />
          </main>
        </div>
      </div>
    </div>
  );
};

// components/Navbar.jsx
const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm px-4 py-2">
      <div className="flex justify-between items-center max-w-[1920px] mx-auto">
        <div className="flex items-center flex-1 lg:ml-0">
          <div className="relative flex items-center w-full max-w-md">
            <input
              type="text"
              placeholder="Pencarian"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <IoSearchOutline className="absolute left-3 text-gray-400 w-5 h-5" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-full">
            <IoNotificationsOutline className="text-gray-500 w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <img
            src="/api/placeholder/32/32"
            alt="Profile"
            className="w-8 h-8 rounded-full cursor-pointer"
          />
        </div>
      </div>
    </nav>
  );
};

const Sidebar = () => {
  const courses = [
    { name: "React.JS", status: "Completed", progress: 100 },
    { name: "Vue.JS", status: "Completed", progress: 100 },
    { name: "Bootstrap", status: "Completed", progress: 100 },
    { name: "Laravel", status: "Completed", progress: 100 },
    { name: "Flutter", status: "Completed", progress: 100 },
    { name: "Figma", status: "In Progress", progress: 75 },
    { name: "Kotlin", status: "In Progress", progress: 60 },
    { name: "Kotlin", status: "In Progress", progress: 60 },
    { name: "Kotlin", status: "In Progress", progress: 60 },
    { name: "Kotlin", status: "In Progress", progress: 60 },
  ];

  return (
    <div className="h-full overflow-hidden w-80 bg-[#E5E7EB]">
      {/* Header */}
      <div className="bg-[#2B4B7C] text-white p-4 rounded-t-lg flex items-center gap-3">
        <IoBookOutline className="w-5 h-5" />
        <span className="font-medium">Course Progress</span>
      </div>

      {/* Course List Card */}
      <div className="p-4 lg-max:h-[500px] overflow-auto">
        <div className="bg-white rounded-lg shadow-sm p-4">
          {courses.map((course, index) => (
            <div
              key={index}
              className={`mb-4 ${index === courses.length - 1 ? "" : "mb-6"}`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900">{course.name}</span>
                <span
                  className={`${
                    course.status === "Completed"
                      ? "text-[#2B4B7C]"
                      : "text-orange-500"
                  } text-sm font-medium`}
                >
                  {course.status}
                </span>
              </div>
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    course.status === "Completed"
                      ? "bg-[#2B4B7C]"
                      : "bg-orange-500"
                  }`}
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

// components/AssignmentTable.jsx
import { IoSearchOutline } from "react-icons/io5";

// components/AssignmentTable.jsx
import { IoChevronForward } from "react-icons/io5";

const AssignmentTable = () => {
  const assignments = [
    {
      module: "React.JS",
      title: "Membuat Komponen Navbar",
      submittedAt: {
        date: "2025-02-03",
        time: "14:00:00",
      },
      status: "Completed",
      action: "Submitted",
    },
    {
      module: "Vue.js",
      title: "Implementasi Vue Router",
      submittedAt: {
        date: "2025-02-03",
        time: "09:30:00",
      },
      status: "Completed",
      action: "Submitted",
    },
    {
      module: "Bootstrap",
      title: "Desain UI Dashboard",
      submittedAt: {
        date: "2025-02-05",
        time: "14:00:00",
      },
      status: "Progress",
      action: "Upload",
    },
    {
      module: "Laravel",
      title: "API Authentication dengan JWT",
      submittedAt: {
        date: "2025-02-08",
        time: "18:00:00",
      },
      status: "Progress",
      action: "Upload",
    },
    {
      module: "Flutter",
      title: "Membuat UI Login Page",
      submittedAt: {
        date: "2025-02-10",
        time: "20:00:00",
      },
      status: "Pending",
      action: "Upload",
    },
  ];

  const getStatusStyles = (status: string) => {
    const baseStyles =
      "px-3 py-1 rounded-full inline-flex items-center gap-1.5 text-sm font-medium";
    switch (status) {
      case "Completed":
        return `${baseStyles} bg-gray-100 text-[#2B4B7C] before:content-[''] before:w-1.5 before:h-1.5 before:bg-[#2B4B7C] before:rounded-full`;
      case "Progress":
        return `${baseStyles} bg-gray-100 text-orange-500 before:content-[''] before:w-1.5 before:h-1.5 before:bg-orange-500 before:rounded-full`;
      case "Pending":
        return `${baseStyles} bg-gray-100 text-red-500 before:content-[''] before:w-1.5 before:h-1.5 before:bg-red-500 before:rounded-full`;
      default:
        return baseStyles;
    }
  };

  return (
    <div className="w-full rounded-md">
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead>
            <tr className="bg-[#2B4B7C] text-white">
              <th className="py-3 px-6 text-left font-medium text-sm">
                Module
              </th>
              <th className="py-3 px-6 text-left font-medium text-sm">
                Assignment Title
              </th>
              <th className="py-3 px-6 text-left font-medium text-sm">
                Submitted At
              </th>
              <th className="py-3 px-6 text-left font-medium text-sm">
                Status
              </th>
              <th className="py-3 px-6 text-left font-medium text-sm">
                Submit
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-gray-50">
            {assignments.map((assignment, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-4 px-6 text-gray-900">{assignment.module}</td>
                <td className="py-4 px-6 text-gray-900">{assignment.title}</td>
                <td className="py-4 px-6">
                  <div className="text-gray-900">
                    {assignment.submittedAt.date}
                  </div>
                  <div className="text-gray-600">
                    {assignment.submittedAt.time}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={getStatusStyles(assignment.status)}>
                    {assignment.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`text-sm ${
                      assignment.action === "Upload"
                        ? "text-black font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    {assignment.action}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-1 py-4 bg-gray-50">
        <button className="p-2 rounded hover:bg-gray-200 text-gray-600">
          <IoChevronBack className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded bg-[#2B4B7C] text-white text-sm">
          1
        </button>
        {[2, 3, 4, 5].map((page) => (
          <button
            key={page}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-gray-600 text-sm"
          >
            {page}
          </button>
        ))}
        <span className="px-2 text-gray-600">...</span>
        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-gray-600 text-sm">
          10
        </button>
        <button className="p-2 rounded hover:bg-gray-200 text-gray-600">
          <IoChevronForward className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
