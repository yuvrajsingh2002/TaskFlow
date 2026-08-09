import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AddTaskModal from "../components/AddTaskModal";
import { FaEdit, FaTrash } from "react-icons/fa";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");
const [priorityFilter, setPriorityFilter] = useState("All");
const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchTasks();
  }, []);

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

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">My Tasks</h1>
            <div className="flex flex-col lg:flex-row gap-3 mb-6">

  <input
    type="text"
    placeholder="Search task..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border border-gray-300 rounded-lg p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

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

</div>

            <button
  onClick={() => setShowModal(true)}
  className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
>
  + Add Task
</button>
          </div>

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

      {filteredTasks.map((task) => (

        <div
  key={task._id}
  className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
>

          <h2 className="text-xl font-bold">
            {task.title}
          </h2>

          <p className="text-gray-600 mt-2">
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
<p className="text-sm text-gray-500 mt-3">
  Due:{" "}
  {new Date(task.dueDate).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })}
</p>

          </div>

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
        </div>
      </div>
      {showModal && (
  <AddTaskModal
    onClose={() => setShowModal(false)}
    onAddTask={handleAddTask}
  />
)}
{editingTask && (
  <AddTaskModal
    initialData={editingTask}
    onClose={() => setEditingTask(null)}
    onAddTask={handleUpdateTask}
  />
)}
    </div>
  );
}

export default Tasks;