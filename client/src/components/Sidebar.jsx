
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaTasks,
  FaHistory,
  FaTimes,
} from "react-icons/fa";

import { useSidebar } from "../context/SidebarContext";

function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useSidebar();

  if (!sidebarOpen) {
    return null;
  }

  return (
    <>
      {/* Fixed Sidebar */}
      <aside className="fixed top-16 left-0 z-40 w-72 h-[calc(100vh-4rem)] bg-slate-900 text-white p-7 shrink-0 overflow-y-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-12">

          <h2 className="text-2xl font-bold">
            Menu
          </h2>

          <button
            onClick={toggleSidebar}
            className="text-gray-300 hover:text-white text-xl"
            title="Close Sidebar"
          >
            <FaTimes />
          </button>

        </div>

        <nav className="space-y-3">

          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-lg ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`
            }
          >
            <FaHome />
            Dashboard
          </NavLink>

          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-lg ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`
            }
          >
            <FaTasks />
            Tasks
          </NavLink>

          <NavLink
            to="/activity"
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-lg ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`
            }
          >
            <FaHistory />
            Activity Logs
          </NavLink>

        </nav>

      </aside>

      {/* Sidebar space in normal layout */}
      <div className="w-72 shrink-0" />
    </>
  );
}

export default Sidebar;
