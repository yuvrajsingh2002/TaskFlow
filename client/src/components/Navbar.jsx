import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

function Navbar({ showSidebarToggle = true }) {
  const navigate = useNavigate();

  const { sidebarOpen, toggleSidebar } = useSidebar();
  const [open, setOpen] = useState(false);

  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isLoggedIn = Boolean(token && user);

  const dashboardPath =
    user?.role === "admin" ? "/admin" : "/dashboard";

  const handleProtectedNavigation = (path) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully");

    window.location.assign("/");
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
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 min-h-16 w-full bg-white shadow-sm px-6 flex items-center justify-between">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">

        {showSidebarToggle && !sidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="text-gray-700 text-xl hover:text-blue-600 cursor-pointer"
            title="Open Sidebar"
          >
            <FaBars />
          </button>
        )}

        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-9 h-9 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-lg">
            <FaTasks />
          </div>

          <h1 className="text-2xl font-bold text-blue-600">
            TaskFlow
          </h1>
        </Link>
      </div>

      {/* CENTER NAVIGATION */}
      <div className="flex items-center gap-5">
        <Link
          to="/"
          className="text-gray-700 font-medium hover:text-blue-600 cursor-pointer"
        >
          Home
        </Link>

        <button
          onClick={() => handleProtectedNavigation(dashboardPath)}
          className="text-gray-700 font-medium hover:text-blue-600 cursor-pointer"
        >
          Dashboard
        </button>

        <button
          onClick={() =>
            handleProtectedNavigation(
              user?.role === "admin" ? "/admin/tasks" : "/tasks"
            )
          }
          className="text-gray-700 font-medium hover:text-blue-600 cursor-pointer"
        >
          Add Tasks
        </button>
      </div>

      {/* RIGHT SIDE */}
      {isLoggedIn ? (
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 font-semibold text-gray-700 hover:text-blue-600 cursor-pointer"
          >
            <FaUserCircle className="text-2xl" />
            <span>{user.name}</span>
            <FaChevronDown className="text-sm" />
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">

              <button
                onClick={handleProfile}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-left cursor-pointer"
              >
                <FaUser />
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 text-left cursor-pointer"
              >
                <FaSignOutAlt />
                Logout
              </button>

            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:text-blue-700 cursor-pointer"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Signup
          </Link>
        </div>
      )}

    </nav>
  );
}

export default Navbar;