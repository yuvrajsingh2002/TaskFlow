import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import ActivityLog from "./pages/ActivityLog";
import TaskDetails from "./pages/TaskDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import { SidebarProvider } from "./context/SidebarContext";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUserDetails from "./pages/AdminUserDetails";
import AdminTasks from "./pages/AdminTasks";
import AdminTaskDetails from "./pages/AdminTaskDetails";
import AdminProfile from "./pages/AdminProfile";
import AdminActivityLog from "./pages/AdminActivityLog";
function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* User Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks/:id"
            element={
              <ProtectedRoute>
                <TaskDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/activity"
            element={
              <ProtectedRoute>
                <ActivityLog />
              </ProtectedRoute>
            }
          />
          {/* Admin Protected Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users/:id"
            element={
              <AdminRoute>
                <AdminUserDetails />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/tasks"
            element={
              <AdminRoute>
                <AdminTasks />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <AdminRoute>
                <AdminProfile />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/activity"
            element={
              <AdminRoute>
                <AdminActivityLog />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users/:userId/tasks/:taskId"
            element={
              <AdminRoute>
                <AdminTaskDetails />
              </AdminRoute>
            }
          />

        </Routes>
      </SidebarProvider>
    </BrowserRouter>
  );
}
export default App;