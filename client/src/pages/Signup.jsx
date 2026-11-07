
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../services/api";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const passwordRules = [
    {
      label: "At least 1 capital letter (A-Z)",
      test: /[A-Z]/.test(formData.password),
    },
    {
      label: "At least 1 small letter (a-z)",
      test: /[a-z]/.test(formData.password),
    },
    {
      label: "At least 1 special character (@#$! etc.)",
      test: /[^A-Za-z0-9]/.test(formData.password),
    },
    {
      label: "At least 1 digit (0-9)",
      test: /[0-9]/.test(formData.password),
    },
    {
      label: "Minimum 6 characters",
      test: formData.password.length >= 6,
    },
  ];

  const isPasswordValid = passwordRules.every((rule) => rule.test);

  const isPasswordMatching =
    formData.password === formData.confirmPassword;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, mobile, password, confirmPassword } = formData;

    if (!name || !email || !mobile || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    if (!isPasswordValid) {
      toast.error("Password does not meet all requirements");
      return;
    }

    if (!isPasswordMatching) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const { data } = await api.post("/auth/signup", {
        name,
        email,
        mobile,
        password,
      });

      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Signup Failed"
      );
    }
  };

  return (
    <>
      <Navbar showSidebarToggle={false} />

      <div className="pt-16 min-h-screen bg-gray-100">
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-8">

          <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

            <h1 className="text-3xl font-bold text-center text-blue-600">
              TaskFlow
            </h1>

            <p className="text-center text-gray-500 mt-2">
              Create your account
            </p>

            <form onSubmit={handleSubmit} className="mt-8">

              {/* Name */}
              <div className="mb-5">
                <label className="block mb-2 font-medium">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

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

              {/* Mobile Number */}
              <div className="mb-5">
                <label className="block mb-2 font-medium">
                  Mobile Number
                </label>

                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");

                    if (value.length <= 10) {
                      setFormData({
                        ...formData,
                        mobile: value,
                      });
                    }
                  }}
                  placeholder="Enter 10-digit mobile number"
                  maxLength={10}
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Password */}
              <div className="mb-5">
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

                {/* Password Requirements */}
                <div className="mt-3 space-y-1">
                  {passwordRules.map((rule, index) => (
                    <p
                      key={index}
                      className={`text-sm ${
                        rule.test ? "text-green-600" : "text-gray-500"
                      }`}
                    >
                      {rule.test ? "✓" : "○"} {rule.label}
                    </p>
                  ))}
                </div>
              </div>

              {/* Confirm Password */}
              <div className="mb-6">
                <label className="block mb-2 font-medium">
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="w-full border rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-4 top-4"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {formData.confirmPassword && (
                  <p
                    className={`text-sm mt-2 ${
                      isPasswordMatching
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {isPasswordMatching
                      ? "✓ Passwords match"
                      : "✗ Passwords do not match"}
                  </p>
                )}
              </div>

              {/* Signup Button */}
              <button
                type="submit"
                disabled={!isPasswordValid || !isPasswordMatching}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Signup
              </button>

            </form>

            {/* Login Link */}
            <p className="text-center mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-semibold"
              >
                Login
              </Link>
            </p>

          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
