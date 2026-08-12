import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import AdminSidebar from "../components/AdminSidebar";
import Navbar from "../components/Navbar";
import AddTaskModal from "../components/AddTaskModal";
import { FaEdit, FaTrash, FaFileExcel } from "react-icons/fa";
import * as XLSX from "xlsx";

function AdminTasks() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const tasksPerPage = 6;

  // Fetch admin tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/tasks");

      setTasks(data.tasks);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load tasks"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleExportExcel = () => {
  if (tasks.length === 0) {
    toast.error("No tasks available to export");
    return;
  }

  const excelData = tasks.map((task, index) => ({
    "S.No": index + 1,
    "Title": task.title,
    "Description": task.description || "",
    "Priority": task.priority,
    "Status": task.status,
    "Due Date": task.dueDate
      ? new Date(task.dueDate).toLocaleDateString()
      : "",
    "Created On": task.createdAt
      ? new Date(task.createdAt).toLocaleDateString()
      : "",
    "Completed On": task.completedAt
      ? new Date(task.completedAt).toLocaleDateString()
      : "",
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelData);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Admin Tasks"
  );

  XLSX.writeFile(
    workbook,
    "TaskFlow_Admin_Tasks.xlsx"
  );

  toast.success("Tasks exported successfully");
};

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const handleAddTask = async (taskData) => {
    try {
      const { data } = await api.post(
        "/tasks",
        taskData
      );

      toast.success(data.message);

      setShowModal(false);

      fetchTasks();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add task"
      );
    }
  };

  // Update task
  const handleUpdateTask = async (taskData) => {
    try {
      const { data } = await api.put(
        `/tasks/${editingTask._id}`,
        taskData
      );

      toast.success(data.message);

      setEditingTask(null);

      fetchTasks();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Update Failed"
      );
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      const { data } = await api.delete(
        `/tasks/${id}`
      );

      toast.success(data.message);

      fetchTasks();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Delete Failed"
      );
    }
  };

  // Filter
  const filteredTasks = tasks.filter((task) => {
    const matchSearch =
      task.title
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "All" ||
      task.status === statusFilter;

    const matchPriority =
      priorityFilter === "All" ||
      task.priority === priorityFilter;

    return (
      matchSearch &&
      matchStatus &&
      matchPriority
    );
  });

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    statusFilter,
    priorityFilter,
  ]);

  // Pagination
  const totalPages = Math.ceil(
    filteredTasks.length / tasksPerPage
  );

  const startIndex =
    (currentPage - 1) * tasksPerPage;

  const currentTasks = filteredTasks.slice(
    startIndex,
    startIndex + tasksPerPage
  );

  return (
    <div className="flex min-h-screen bg-gray-100">

      <AdminSidebar />

      <div className="flex-1 p-8">
        <Navbar/>
        <div className="p-8">

        {/* Header */}
       <div className="flex justify-between items-center mb-8">

  <h1 className="text-3xl font-bold">
    Admin Tasks
  </h1>

  <div className="flex gap-3">

    {/* Excel */}
    <button
      onClick={handleExportExcel}
      className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
    >
      <FaFileExcel />
      Excel
    </button>

    {/* Add Task */}
    <button
      onClick={() => setShowModal(true)}
      className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
    >
      + Add Task
    </button>

  </div>

</div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-xl shadow p-5 mb-6">

          <div className="flex flex-col lg:flex-row gap-4">

            <input
              type="text"
              placeholder="Search task..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="border border-gray-300 rounded-lg p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="border border-gray-300 rounded-lg p-3"
            >
              <option>All</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) =>
                setPriorityFilter(e.target.value)
              }
              className="border border-gray-300 rounded-lg p-3"
            >
              <option>All</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

          </div>

        </div>

        {/* Tasks */}
        <div className="bg-white rounded-xl shadow p-6">

          {loading ? (
            <p className="text-center py-10 text-gray-500">
              Loading tasks...
            </p>
          ) : filteredTasks.length === 0 ? (

            <div className="text-center py-12">

              <div className="text-5xl mb-4">
                📋
              </div>

              <h2 className="text-xl font-semibold">
                No Tasks Found
              </h2>

              <p className="text-gray-500 mt-2">
                Create your first admin task.
              </p>

            </div>

          ) : (

            <div className="grid gap-4">

              {currentTasks.map((task) => (

                <div
                  key={task._id}
                  className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition"
                >

                  <h2 className="text-xl font-bold">
                    {task.title}
                  </h2>

                  <p className="text-gray-600 mt-2 line-clamp-3">
                    {task.description}
                  </p>

                  <div className="flex gap-3 mt-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        task.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : task.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {task.priority}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
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
                  {/* Date */}
<div className="mt-4 text-gray-600">
  📅{" "}
  <span className="font-medium">
    {task.status === "Completed"
      ? "Completed On:"
      : "Due Date:"}
  </span>{" "}
  {task.status === "Completed"
    ? task.completedAt
      ? new Date(task.completedAt).toLocaleDateString("en-IN")
      : "Not available"
    : task.dueDate
    ? new Date(task.dueDate).toLocaleDateString("en-IN")
    : "No due date"}
</div>

                  {/* Buttons */}
                  <div className="flex gap-3 mt-5">

                    <button
                      onClick={() =>
                        setEditingTask(task)
                      }
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(task._id)
                      }
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      <FaTrash />
                    </button>

                  </div>

                </div>

              ))}

            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (

            <div className="flex justify-center items-center gap-2 mt-8">

              <button
                onClick={() =>
                  setCurrentPage(
                    (prev) => prev - 1
                  )
                }
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-lg disabled:opacity-50"
              >
                ← Previous
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() =>
                      setCurrentPage(index + 1)
                    }
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === index + 1
                        ? "bg-blue-600 text-white"
                        : "border hover:bg-gray-100"
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              )}

              <button
                onClick={() =>
                  setCurrentPage(
                    (prev) => prev + 1
                  )
                }
                disabled={
                  currentPage === totalPages
                }
                className="px-4 py-2 border rounded-lg disabled:opacity-50"
              >
                Next →
              </button>

            </div>
          )}

        </div>

      </div>

      {/* Add Task */}
      {showModal && (
        <AddTaskModal
          onClose={() => setShowModal(false)}
          onAddTask={handleAddTask}
        />
      )}

      {/* Edit Task */}
      {editingTask && (
        <AddTaskModal
          onClose={() =>
            setEditingTask(null)
          }
          onAddTask={handleUpdateTask}
          initialData={editingTask}
        />
      )}

    </div>
  );
}

export default AdminTasks;