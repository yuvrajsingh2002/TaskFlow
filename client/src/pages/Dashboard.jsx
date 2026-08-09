import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import api from "../services/api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const fetchTasks = async () => {
  try {
    const { data } = await api.get("/tasks");
    setTasks(data.tasks);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchTasks();
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

const highPriority = tasks.filter(
  (task) => task.priority === "High"
).length;
  return (
    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="flex">

        <Sidebar />

        <div className="flex-1 p-8">

          <h1 className="text-3xl font-bold mb-8">
            Dashboard
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">

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
  color="bg-purple-600"
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

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;