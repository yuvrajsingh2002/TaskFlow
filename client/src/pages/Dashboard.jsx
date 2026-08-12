import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import api from "../services/api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [activities, setActivities] = useState([]);
  const fetchTasks = async () => {
  try {
    const { data } = await api.get("/tasks");
    setTasks(data.tasks);
  } catch (error) {
    console.log(error);
  }
};

const fetchActivities = async () => {
  try {
    const { data } = await api.get("/activities");
    setActivities(data.activities.slice(0, 5));
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchTasks();
  fetchActivities();
}, []);

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

const completionRate =
  totalTasks === 0
    ? 0
    : Math.round((completedTasks / totalTasks) * 100);

const highPriority = tasks.filter(
  (task) => task.priority === "High"
).length;

  const overdueTasks = tasks.filter((task) => {
  if (task.status === "Completed" || !task.dueDate) {
    return false;
  }

  const dueDate = new Date(task.dueDate);
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);

  return dueDate < today;
}).length;

  return (
  <>
    <Navbar />

    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8">

        <h1 className="text-3xl font-bold mb-8">
          Dashboard
        </h1>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-5">

          <DashboardCard
            title="Total Tasks"
            value={totalTasks}
            color="bg-blue-600"
          />

          <DashboardCard
            title="Pending"
            value={pendingTasks}
            color="bg-yellow-500"
          />

          <DashboardCard
            title="In Progress"
            value={progressTasks}
            color="bg-indigo-600"
          />

          <DashboardCard
            title="Completed"
            value={completedTasks}
            color="bg-green-600"
          />

          <DashboardCard
            title="High Priority"
            value={highPriority}
            color="bg-red-600"
          />

          <DashboardCard
            title="Overdue Tasks"
            value={overdueTasks}
            color="bg-orange-600"
          />

        </div>

        {/* Task Completion */}
        <div className="bg-white rounded-xl shadow p-6 mt-6">

          <div className="flex justify-between items-center mb-3">

            <h2 className="text-lg font-semibold">
              Task Completion
            </h2>

            <span className="font-bold text-blue-600">
              {completionRate}%
            </span>

          </div>

          <div className="w-full bg-gray-200 rounded-full h-3">

            <div
              className="bg-blue-600 h-3 rounded-full transition-all"
              style={{ width: `${completionRate}%` }}
            ></div>

          </div>

        </div>

        {/* Recent Activity */}
        
      </div>
    </div>
  </>
);
}

export default Dashboard;