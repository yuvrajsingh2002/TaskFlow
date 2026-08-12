import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import AdminSidebar from "../components/AdminSidebar";

function AdminUserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Track which task description is expanded
  

  const fetchUserDetails = async () => {
    try {
      setLoading(true);

      const { data } = await api.get(`/admin/users/${id}`);

      setUser(data.user);
      setTasks(data.tasks || []);
      setActivities(data.activities || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <AdminSidebar />

        <div className="flex-1">
          <Navbar />

          <div className="p-8">
            <p className="text-gray-500">
              Loading user details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen">
        <AdminSidebar />

        <div className="flex-1">
          <Navbar />

          <div className="p-8">
            <p className="text-red-500">
              User not found
            </p>
          </div>
        </div>
      </div>
    );
  }

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const progressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  return (
    <div className="flex min-h-screen">
      
      {/* ADMIN SIDEBAR */}
      <AdminSidebar />

      <div className="flex-1">
        
        {/* NAVBAR */}
        <Navbar />

        <div className="p-8">

          {/* Back Button */}
          <button
            onClick={() => navigate("/admin")}
            className="mb-6 px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            ← Back to Users
          </button>

          {/* USER INFORMATION */}
          <div className="bg-white rounded-xl shadow p-6 mb-8">

            <div className="flex items-center gap-5">

              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              <div>
                <h1 className="text-3xl font-bold">
                  {user.name}
                </h1>

                <p className="text-gray-500">
                  {user.email}
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  Joined:{" "}
                  {new Date(user.createdAt).toLocaleDateString(
                    "en-US"
                  )}
                </p>

                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                  {user.role}
                </span>
              </div>

            </div>

          </div>

          {/* TASK STATISTICS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

            <div className="bg-blue-600 text-white rounded-xl p-5">
              <p className="text-sm">
                Total Tasks
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {totalTasks}
              </h2>
            </div>

            <div className="bg-gray-600 text-white rounded-xl p-5">
              <p className="text-sm">
                Pending
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {pendingTasks}
              </h2>
            </div>

            <div className="bg-yellow-500 text-white rounded-xl p-5">
              <p className="text-sm">
                In Progress
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {progressTasks}
              </h2>
            </div>

            <div className="bg-green-600 text-white rounded-xl p-5">
              <p className="text-sm">
                Completed
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {completedTasks}
              </h2>
            </div>

          </div>

          {/* USER TASKS */}
          <div className="bg-white rounded-xl shadow p-6 mb-8">

            <h2 className="text-2xl font-bold mb-5">
              User Tasks
            </h2>

            {tasks.length === 0 ? (
              <p className="text-gray-500">
                No tasks found.
              </p>
            ) : (

              <div className="space-y-4">

                {tasks.map((task) => {

                  
                  return (
                    <div
                      key={task._id}
                      className="border rounded-lg p-5"
                    >

                      {/* TITLE + STATUS */}
                      <div className="flex justify-between items-start gap-4">

                        <div>
  <h3 className="text-xl font-bold">
    {task.title}
  </h3>

  <p className="text-gray-600 mt-2 line-clamp-2">
    {task.description}
  </p>

  <button
    onClick={() =>
      navigate(
        `/admin/users/${id}/tasks/${task._id}`
      )
    }
    className="text-blue-600 font-semibold mt-3 hover:underline"
  >
    View Details →
  </button>
</div>

                        {/* STATUS */}
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                            task.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : task.status === "In Progress"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {task.status}
                        </span>

                      </div>

                      {/* PRIORITY + DATE */}
                      <div className="flex flex-wrap gap-3 mt-4">

                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            task.priority === "High"
                              ? "bg-red-100 text-red-700"
                              : task.priority === "Medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {task.priority}
                        </span>

                        {task.status === "Completed" ? (

                          <span className="text-green-600 text-sm py-1">
                            Completed On:{" "}
                            {task.completedAt
                              ? new Date(
                                  task.completedAt
                                ).toLocaleDateString(
                                  "en-US"
                                )
                              : "Date not available"}
                          </span>

                        ) : (

                          <span className="text-gray-600 text-sm py-1">
                            Due Date:{" "}
                            {task.dueDate
                              ? new Date(
                                  task.dueDate
                                ).toLocaleDateString(
                                  "en-US"
                                )
                              : "No due date"}
                          </span>

                        )}

                      </div>

                    </div>
                  );
                })}

              </div>
            )}

          </div>

          {/* ACTIVITY */}
          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-2xl font-bold mb-5">
              Activity
            </h2>

            {activities.length === 0 ? (

              <p className="text-gray-500">
                No activity found.
              </p>

            ) : (

              <div className="space-y-4">

                {activities.map((activity) => (

                  <div
                    key={activity._id}
                    className="border-b pb-4 last:border-b-0"
                  >

                    <p className="font-semibold">
                      {activity.action}
                    </p>

                    <p className="text-gray-500 text-sm mt-1">
                      Task: {activity.taskTitle}
                    </p>

                    <p className="text-gray-400 text-sm mt-1">
                      {new Date(
                        activity.createdAt
                      ).toLocaleString("en-US")}
                    </p>

                  </div>

                ))}

              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminUserDetails;