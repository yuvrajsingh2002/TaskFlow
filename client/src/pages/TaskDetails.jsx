import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data } = await api.get(`/tasks/${id}`);
        setTask(data.task);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Loading task...</p>;
  }

  if (!task) {
    return <p className="text-center mt-10">Task not found</p>;
  }

  return (
    <>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8">
          <button
            onClick={() => navigate("/tasks")}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg mb-6 hover:bg-gray-700"
          >
            ← Back
          </button>

          <div className="bg-white rounded-xl shadow p-8">
            <h1 className="text-3xl font-bold mb-4">
              {task.title}
            </h1>

            <p className="text-gray-700 mb-6 whitespace-pre-wrap">
              {task.description}
            </p>

            <div className="flex gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-gray-100">
                Priority: {task.priority}
              </span>

              <span className="px-3 py-1 rounded-full bg-blue-100">
                Status: {task.status}
              </span>
            </div>

            {task.status === "Completed" ? (
              <p className="text-green-600 font-medium">
                Completed On:{" "}
                {task.completedAt
                  ? new Date(task.completedAt).toLocaleDateString("en-US")
                  : "Date not available"}
              </p>
            ) : (
              <p className="text-gray-600 font-medium">
                Due Date:{" "}
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString("en-US")
                  : "No due date"}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskDetails;