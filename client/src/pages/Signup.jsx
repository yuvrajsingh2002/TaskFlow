import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../services/api";
import toast from "react-hot-toast";


function Signup() {
  const navigate = useNavigate();

const [showPassword, setShowPassword] = useState(false);

const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
});

    const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.email || !formData.password) {
    toast.error("Please fill all fields");
    return;
  }

  try {
    const { data } = await api.post("/auth/signup", formData);

    toast.success(data.message);

    navigate("/");

  } catch (error) {
    toast.error(
      error.response?.data?.message || "Signup Failed"
    );
  }
};

    const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-blue-600">
          TaskFlow
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Create your account
        </p>

        <form onSubmit={handleSubmit} className="mt-8">

          <div className="mb-5">
            <label className="block mb-2 font-medium">Name</label>
            <input
  type="text"
  name="name"
  value={formData.name}
  onChange={handleChange}
  placeholder="Enter your name"
  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
          </div>

          <div className="mb-5">
            <label className="block mb-2 font-medium">Email</label>
            <input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="Enter your email"
  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium">Password</label>

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

          <button
  type="submit"
  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
>
  Signup
</button>

        </form>

        <p className="text-center mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;