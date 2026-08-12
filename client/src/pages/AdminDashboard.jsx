import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import AdminSidebar from "../components/AdminSidebar";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/admin/users");
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">
          <h1 className="text-3xl font-bold mb-8">
            Admin Dashboard
          </h1>

          {loading ? (
            <p className="text-gray-500">
              Loading users...
            </p>
          ) : users.length === 0 ? (
            <p className="text-gray-500">
              No users found.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {users.map((user) => (
                <div
                  key={user._id}
                  onClick={() =>
                    navigate(`/admin/users/${user._id}`)
                  }
                  className="bg-white rounded-xl shadow p-6 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h2 className="text-xl font-bold">
                        {user.name}
                      </h2>

                      <p className="text-gray-500 text-sm">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500">
                    Joined:{" "}
                    {new Date(
                      user.createdAt
                    ).toLocaleDateString("en-US")}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/admin/users/${user._id}`);
                    }}
                    className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;