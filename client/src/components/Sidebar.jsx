import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaHome,
  FaTasks,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully");

    navigate("/");
  };

  return (
    <div className="w-72 min-h-screen bg-slate-900 text-white p-6">

      <h2 className="text-2xl font-bold mb-12">
        Menu
      </h2>

      <div className="flex flex-col gap-4">

        <NavLink
          to="/dashboard"
          className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-slate-800"
        >
          <FaHome />
          Dashboard
        </NavLink>

        <NavLink
          to="/tasks"
          className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-slate-800"
        >
          <FaTasks />
          Tasks
        </NavLink>

        {/* Profile */}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-lg ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-white hover:bg-slate-800"
            }`
          }
        >
          <FaUser />
          Profile
        </NavLink>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 px-4 py-3 rounded-lg text-white hover:bg-red-600 text-left w-full"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </div>
  );
}

export default Sidebar;