import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AddTaskModal from "../components/AddTaskModal";
import { FaEdit, FaTrash } from "react-icons/fa";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");
const [priorityFilter, setPriorityFilter] = useState("All");
const [loading, setLoading] = useState(true);
const [currentPage, setCurrentPage] = useState(1);
const navigate = useNavigate();

const tasksPerPage = 6;

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/tasks");
      
      setTasks(data.tasks);
    } catch (error) {
      console.log(error);
    }
    finally {
    setLoading(false);
  }
  };

  const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
  "Are you sure you want to delete this task?"
);

  if (!confirmDelete) return;

  try {

    const { data } = await api.delete(`/tasks/${id}`);

    toast.success(data.message);

    fetchTasks();

  } catch (error) {

    toast.error(
      error.response?.data?.message || "Delete Failed"
    );

  }

};

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
      error.response?.data?.message || "Update Failed"
    );
  }
};

  const handleAddTask = async (taskData) => {
  try {
    const { data } = await api.post("/tasks", taskData);

    toast.success(data.message);

    setShowModal(false);

    fetchTasks();
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to add task");
  }
};
const handleExportExcel = () => {
  const exportData = filteredTasks.map((task) => ({
    Title: task.title,
    Description: task.description,
    Priority: task.priority,
    Status: task.status,
    "Due Date": task.dueDate
      ? new Date(task.dueDate).toLocaleDateString("en-GB")
      : "No due date",
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);

  worksheet["!cols"] = [
    { wch: 25 },
    { wch: 35 },
    { wch: 15 },
    { wch: 18 },
    { wch: 15 },
  ];

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Tasks"
  );

  XLSX.writeFile(
    workbook,
    "TaskFlow_Tasks.xlsx"
  );

  toast.success("Tasks exported successfully");
};

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
  setCurrentPage(1);
}, [search, statusFilter, priorityFilter]);

  const filteredTasks = tasks.filter((task) => {

  const matchSearch =
    task.title.toLowerCase().includes(search.toLowerCase());

  const matchStatus =
    statusFilter === "All" ||
    task.status === statusFilter;

  const matchPriority =
    priorityFilter === "All" ||
    task.priority === priorityFilter;

  return matchSearch && matchStatus && matchPriority;

});

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

const startIndex = (currentPage - 1) * tasksPerPage;

const currentTasks = filteredTasks.slice(
  startIndex,
  startIndex + tasksPerPage
);

  return (
  <>
    <Navbar />

    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">

          <h1 className="text-3xl font-bold">
            My Tasks
          </h1>

          <div className="flex flex-wrap gap-3">

            {/* Search */}
            <input
              type="text"
              placeholder="Search task..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-56 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>All</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

            {/* Priority */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>All</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            {/* Add Task */}
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
            >
              + Add Task
            </button>

            {/* Export */}
            <button
              onClick={handleExportExcel}
              className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
            >
              Export to Excel
            </button>

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
                Create your first task to get started.
              </p>

            </div>

          ) : (

            <div className="grid gap-4">

              {currentTasks.map((task) => (

                <div
                  key={task._id}
                  className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
                >

                  {/* Title */}
                  <h2 className="text-xl font-bold">
                    {task.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 mt-2">
  {task.description.length > 150
    ? `${task.description.substring(0, 150)}...`
    : task.description}
</p>

{task.description.length > 150 && (
  <button
    onClick={() => navigate(`/tasks/${task._id}`)}
    className="text-blue-600 font-medium mt-2 hover:underline"
  >
    View More
  </button>
)}

                  {/* Priority + Status */}
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
                  {task.status === "Completed" ? (

                    <div className="mt-3 text-green-600">
                      Completed On:{" "}
                      {task.completedAt
                        ? new Date(
                            task.completedAt
                          ).toLocaleDateString("en-US")
                        : "Date not available"}
                    </div>

                  ) : (

                    <div className="mt-3 text-gray-600">
                      Due Date:{" "}
                      {task.dueDate
                        ? new Date(
                            task.dueDate
                          ).toLocaleDateString("en-US")
                        : "No due date"}
                    </div>

                  )}

                  {/* Buttons */}
                  <div className="flex gap-3 mt-5">

                    <button
                      onClick={() => setEditingTask(task)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => handleDelete(task._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      <FaTrash />
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* Pagination */}
        {totalPages > 1 && (

          <div className="flex justify-center items-center gap-2 mt-6">

            {/* Previous */}
            <button
              onClick={() =>
                setCurrentPage((prev) => prev - 1)
              }
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              ← Previous
            </button>

            {/* Page Numbers */}
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

            {/* Next */}
            <button
              onClick={() =>
                setCurrentPage((prev) => prev + 1)
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Next →
            </button>

          </div>

        )}

      </div>
    </div>

    {/* Add Task Modal */}
    {showModal && (
  <AddTaskModal
    onClose={() => setShowModal(false)}
    onAddTask={handleAddTask}
  />
)}
{editingTask && (
  <AddTaskModal
    onClose={() => setEditingTask(null)}
    initialData={editingTask}
    onAddTask={handleUpdateTask}
  />
)}

  </>
);
}

export default Tasks;