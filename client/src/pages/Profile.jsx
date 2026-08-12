import { useEffect, useState } from "react";
import { FaUserCircle, FaLock } from "react-icons/fa";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    try {
      const { data } = await api.put(
        "/auth/change-password",
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }
      );

      toast.success(data.message);

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setShowPasswordForm(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to change password"
      );
    }
  };

  const fetchProfile = async () => {
    try {
      const { data } = await api.get("/auth/profile");
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8 bg-gray-50 min-h-screen">

          <h1 className="text-3xl font-bold mb-8">
            My Profile
          </h1>

          {/* Profile Information */}
          {user && (
            <div className="bg-white rounded-xl shadow p-6 max-w-lg">

              <div className="flex items-center gap-4 mb-8">
                <FaUserCircle className="text-6xl text-blue-600" />

                <div>
                  <h2 className="text-2xl font-bold">
                    {user.name}
                  </h2>

                  <p className="text-gray-500">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="border-t pt-5">

                <div className="mb-5">
                  <p className="text-gray-500">
                    Name
                  </p>

                  <p className="text-lg font-semibold">
                    {user.name}
                  </p>
                </div>

                <div className="mb-5">
                  <p className="text-gray-500">
                    Email
                  </p>

                  <p className="text-lg font-semibold">
                    {user.email}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Account Type
                  </p>

                  <p className="text-lg font-semibold capitalize">
                    {user.role || "User"}
                  </p>
                </div>

              </div>

              {/* Change Password Button */}
              {!showPasswordForm && (
                <button
                  onClick={() =>
                    setShowPasswordForm(true)
                  }
                  className="mt-8 flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
                >
                  <FaLock />
                  Change Password
                </button>
              )}

            </div>
          )}

          {/* Change Password Form */}
          {showPasswordForm && (
            <div className="bg-white rounded-xl shadow p-6 max-w-lg mt-6">

              <h2 className="text-xl font-bold mb-6">
                Change Password
              </h2>

              <form onSubmit={handleChangePassword}>

                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Current Password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full border rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full border rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full border rounded-lg px-4 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

                <div className="flex gap-3">

                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
                  >
                    Change Password
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordForm(false);

                      setPasswordData({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                      });
                    }}
                    className="bg-gray-200 text-gray-700 px-5 py-3 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>

                </div>

              </form>

            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default Profile;