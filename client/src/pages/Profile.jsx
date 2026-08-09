import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [passwordData, setPasswordData] = useState({
  currentPassword: "",
  newPassword: "",
});

    const handlePasswordChange = (e) => {
  setPasswordData({
    ...passwordData,
    [e.target.name]: e.target.value,
  });
};

    const handleChangePassword = async (e) => {
  e.preventDefault();

  try {
    const { data } = await api.put(
      "/auth/change-password",
      passwordData
    );

    alert(data.message);

    setPasswordData({
      currentPassword: "",
      newPassword: "",
    });

  } catch (error) {
    alert(
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
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8">

          <h1 className="text-3xl font-bold mb-8">
            My Profile
          </h1>

          <div className="bg-white rounded-xl shadow p-6 max-w-lg mt-6">

  <h2 className="text-xl font-bold mb-5">
    Change Password
  </h2>

  <form onSubmit={handleChangePassword}>

    <input
      type="password"
      name="currentPassword"
      placeholder="Current Password"
      value={passwordData.currentPassword}
      onChange={handlePasswordChange}
      className="w-full border rounded-lg px-4 py-3 mb-4"
      required
    />

    <input
      type="password"
      name="newPassword"
      placeholder="New Password"
      value={passwordData.newPassword}
      onChange={handlePasswordChange}
      className="w-full border rounded-lg px-4 py-3 mb-4"
      required
    />

    <button
      type="submit"
      className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
    >
      Change Password
    </button>

  </form>

</div>

          {user && (
            <div className="bg-white rounded-xl shadow p-6 max-w-lg">

              <div className="mb-5">
                <p className="text-gray-500">Name</p>
                <p className="text-xl font-semibold">
                  {user.name}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Email</p>
                <p className="text-xl font-semibold">
                  {user.email}
                </p>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Profile;