import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaHistory,
  FaTasks,
  FaTimes,
} from "react-icons/fa";

import { useSidebar } from "../context/SidebarContext";

function AdminSidebar() {
  const { sidebarOpen, toggleSidebar } = useSidebar();

  if (!sidebarOpen) {
    return null;
  }

  return (
    <aside className="w-72 bg-[#0f172a] text-white min-h-screen p-6 shrink-0">

      {/* SIDEBAR HEADER */}
      <div className="flex items-center justify-between mb-10">

        <h2 className="text-2xl font-bold">
          Admin Menu
        </h2>

        {/* CLOSE SIDEBAR */}
        <button
          onClick={toggleSidebar}
          className="text-gray-300 hover:text-white text-xl"
          title="Close Sidebar"
        >
          <FaTimes />
        </button>

      </div>

      {/* MENU */}
      <nav className="space-y-3">

        {/* ADMIN DASHBOARD */}
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-lg transition ${
              isActive
                ? "bg-blue-600"
                : "hover:bg-gray-800"
            }`
          }
        >
          <FaHome />
          <span>Admin Dashboard</span>
        </NavLink>

        {/* TASKS */}
        <NavLink
          to="/admin/tasks"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-lg transition ${
              isActive
                ? "bg-blue-600"
                : "hover:bg-gray-800"
            }`
          }
        >
          <FaTasks />
          <span>Tasks</span>
        </NavLink>

        {/* ACTIVITY LOGS */}
        <NavLink
          to="/admin/activity"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-lg transition ${
              isActive
                ? "bg-blue-600"
                : "hover:bg-gray-800"
            }`
          }
        >
          <FaHistory />
          <span>Activity Logs</span>
        </NavLink>

      </nav>

      {/* SMALL EXCEL ICON */}
      

    </aside>
  );
}

export default AdminSidebar;