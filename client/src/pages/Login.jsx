import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUser, FaUserShield } from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loginType, setLoginType] = useState("user");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const { data } = await api.post("/auth/login", formData);

      // Check selected login type
      if (loginType === "admin" && data.user.role !== "admin") {
        toast.error("This account is not an admin account");
        return;
      }

      if (loginType === "user" && data.user.role !== "user") {
        toast.error("Please use Admin Login for this account");
        return;
      }

      // Save token
      localStorage.setItem("token", data.token);

      // Save user
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success(data.message);

      // Redirect according to role
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        {/* Logo */}
        <h1 className="text-3xl font-bold text-center text-blue-600">
          TaskFlow
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Login to your account
        </p>

        {/* Login Type */}
        <div className="grid grid-cols-2 gap-3 mt-8">

          <button
            type="button"
            onClick={() => setLoginType("user")}
            className={`flex items-center justify-center gap-2 py-3 rounded-lg border font-medium transition ${
              loginType === "user"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
            }`}
          >
            <FaUser />
            User Login
          </button>

          <button
            type="button"
            onClick={() => setLoginType("admin")}
            className={`flex items-center justify-center gap-2 py-3 rounded-lg border font-medium transition ${
              loginType === "admin"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
            }`}
          >
            <FaUserShield />
            Admin Login
          </button>

        </div>

        <form onSubmit={handleSubmit} className="mt-6">

          {/* Email */}
          <div className="mb-5">
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full border rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loginType === "admin"
              ? "Login as Admin"
              : "Login"}
          </button>

        </form>

        {/* Signup only for normal users */}
        {loginType === "user" && (
          <p className="text-center mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-semibold"
            >
              Signup
            </Link>
          </p>
        )}

      </div>
    </div>
  );
}

export default Login;