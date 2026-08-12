import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import AdminSidebar from "../components/AdminSidebar";

function AdminTaskDetails() {
  const { userId, taskId } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTaskDetails = async () => {
    try {
      setLoading(true);

      const { data } = await api.get(
        `/admin/users/${userId}/tasks/${taskId}`
      );

      setTask(data.task);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, [userId, taskId]);

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <AdminSidebar />

        <div className="flex-1">
          <Navbar />

          <div className="p-8">
            <p className="text-gray-500">
              Loading task details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex min-h-screen">
        <AdminSidebar />

        <div className="flex-1">
          <Navbar />

          <div className="p-8">
            <p className="text-red-500">
              Task not found
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">

      <AdminSidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          {/* Back Button */}
          <button
            onClick={() =>
              navigate(`/admin/users/${userId}`)
            }
            className="mb-6 px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            ← Back to User
          </button>

          {/* Task Details */}
          <div className="bg-white rounded-xl shadow p-8">

            <div className="flex justify-between items-start gap-5">

              <div>
                <h1 className="text-3xl font-bold">
                  {task.title}
                </h1>

                <p className="text-gray-500 mt-2">
                  Task Details
                </p>
              </div>

              {/* Status */}
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
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

            <hr className="my-6" />

            {/* Description */}
            <div className="mb-6">

              <h2 className="text-lg font-semibold mb-2">
                Description
              </h2>

              <p className="text-gray-700 leading-7 whitespace-pre-wrap">
                {task.description || "No description available"}
              </p>

            </div>

            {/* Task Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Priority */}
              <div>
                <p className="text-gray-500 text-sm">
                  Priority
                </p>

                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
                    task.priority === "High"
                      ? "bg-red-100 text-red-700"
                      : task.priority === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {task.priority}
                </span>
              </div>

              {/* Status */}
              <div>
                <p className="text-gray-500 text-sm">
                  Status
                </p>

                <p className="font-semibold mt-2">
                  {task.status}
                </p>
              </div>

              {/* Created Date */}
              <div>
                <p className="text-gray-500 text-sm">
                  Created On
                </p>

                <p className="font-semibold mt-2">
                  {task.createdAt
                    ? new Date(
                        task.createdAt
                      ).toLocaleString("en-US")
                    : "Not available"}
                </p>
              </div>

              {/* Due / Completed Date */}
              <div>
                <p className="text-gray-500 text-sm">
                  {task.status === "Completed"
                    ? "Completed On"
                    : "Due Date"}
                </p>

                <p className="font-semibold mt-2">
                  {task.status === "Completed"
                    ? task.completedAt
                      ? new Date(
                          task.completedAt
                        ).toLocaleString("en-US")
                      : "Not available"
                    : task.dueDate
                    ? new Date(
                        task.dueDate
                      ).toLocaleDateString("en-US")
                    : "No due date"}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminTaskDetails;