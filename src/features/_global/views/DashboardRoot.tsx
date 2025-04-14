import { useState } from "react";
import { IoMenuOutline } from "react-icons/io5";

import { Outlet, useLocation } from "react-router-dom";
import { DashboardNavbar } from "../../dashboard/components/navbar";
import { DashboardSidebar } from "../../dashboard/components/sidebar";

export const DashboardRoot = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  return (
    <div className="bg-gray-100">
      {/* Sidebar */}
      <DashboardNavbar />

      <div className="flex relative min-h-screen">
        {location.pathname === "/dashboard" && (
          <div
            className={`fixed top-18 left-0 transform lg:relative lg:ml-4 lg:mt-4 lg:translate-x-0 transition duration-200 ease-in-out z-30
          ${
            sidebarOpen ? "translate-x-4" : "-translate-x-full lg:translate-x-0"
          }
        `}
          >
            <DashboardSidebar />
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden fixed top-3 left-[100%] z-50 p-2 rounded-e-2xl bg-white shadow-xl"
            >
              <IoMenuOutline className="w-4 h-4" />
            </button>
          </div>
        )}
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <main className="flex-1 mx-4 mb-4 overflow-x-hidden rounded-lg m-4 lg:m-6">
            {/* <AssignmentTable /> */}
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
