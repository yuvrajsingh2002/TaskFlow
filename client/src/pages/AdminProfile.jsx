import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import Navbar from "../components/Navbar";
import AdminSidebar from "../components/AdminSidebar";

function AdminProfile() {
  const [user, setUser] = useState(null);

  const [showPassword, setShowPassword] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const fetchProfile = async () => {
    try {
      const { data } = await api.get("/auth/profile");

      setUser(data.user);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to load profile"
      );
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const { data } = await api.put(
        "/auth/change-password",
        passwordData
      );

      toast.success(data.message);

      setPasswordData({
        currentPassword: "",
        newPassword: "",
      });

      setShowPassword(false);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Password change failed"
      );
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">

      <AdminSidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <h1 className="text-3xl font-bold mb-8">
            Admin Profile
          </h1>

          <div className="bg-white rounded-xl shadow p-8 max-w-2xl">

            <div className="flex items-center gap-5">

              <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  {user.name}
                </h2>

                <p className="text-gray-500">
                  {user.email}
                </p>
              </div>

            </div>

            <hr className="my-6" />

            <div className="space-y-5">

              <div>
                <p className="text-gray-500">
                  Name
                </p>

                <p className="font-semibold">
                  {user.name}
                </p>
              </div>

              <div>
                <p className="text-gray-500">
                  Email
                </p>

                <p className="font-semibold">
                  {user.email}
                </p>
              </div>

              <div>
                <p className="text-gray-500">
                  Account Type
                </p>

                <span className="inline-block mt-1 px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">
                  Admin
                </span>
              </div>

            </div>

            <button
              onClick={() => setShowPassword(!showPassword)}
              className="mt-8 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
            >
              🔒 Change Password
            </button>

            {showPassword && (
              <form
                onSubmit={handleChangePassword}
                className="mt-6 border-t pt-6 space-y-4"
              >

                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Current Password"
                  value={passwordData.currentPassword}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />

                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={passwordData.newPassword}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />

                <button
                  type="submit"
                  className="bg-green-600 text-white px-5 py-3 rounded-lg"
                >
                  Update Password
                </button>

              </form>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminProfile;