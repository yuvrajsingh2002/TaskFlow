import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaTasks } from "react-icons/fa";

import {
  FaBars,
  FaUserCircle,
  FaChevronDown,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import { useSidebar } from "../context/SidebarContext";

function Navbar() {
  const navigate = useNavigate();

  const {
    sidebarOpen,
    toggleSidebar,
  } = useSidebar();

  const [open, setOpen] = useState(false);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully");

    navigate("/");
  };

  const handleProfile = () => {
    setOpen(false);

    if (user?.role === "admin") {
      navigate("/admin/profile");
    } else {
      navigate("/profile");
    }
  };

  return (
    <nav className="h-16 bg-white shadow-sm px-6 flex items-center justify-between">

      {/* LEFT */}
      <div className="flex items-center gap-4">

        {/* OPEN SIDEBAR */}
        {!sidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="text-gray-700 text-xl hover:text-blue-600"
            title="Open Sidebar"
          >
            <FaBars />
          </button>
        )}

        {/* LOGO */}
        <div className="flex items-center gap-2">

          <div className="w-9 h-9 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-lg">
            <FaTasks className="text-lg" />
          </div>

          <h1 className="text-2xl font-bold text-blue-600">
            TaskFlow
          </h1>

        </div>

      </div>

      {/* RIGHT PROFILE */}
      <div className="relative">

        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 font-semibold text-gray-700 hover:text-blue-600"
        >

          <FaUserCircle className="text-2xl" />

          <span>
            {user?.name}
          </span>

          <FaChevronDown className="text-sm" />

        </button>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">

            {/* PROFILE */}
            <button
              onClick={handleProfile}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-left"
            >
              <FaUser />
              Profile
            </button>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 text-left"
            >
              <FaSignOutAlt />
              Logout
            </button>

          </div>
        )}

      </div>

    </nav>
  );
}

export default Navbar;