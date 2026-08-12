import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import ActivityLog from "./pages/ActivityLog";
import TaskDetails from "./pages/TaskDetails";
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

        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />


        {/* Protected Routes */}

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
        <Route
  path="/admin/activity"
  element={
    <ProtectedRoute>
      <AdminActivityLog />
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
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/users/:id"
  element={
    <ProtectedRoute>
      <AdminUserDetails />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/tasks"
  element={
    <ProtectedRoute>
      <AdminTasks />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/profile"
  element={
    <ProtectedRoute>
      <AdminProfile />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/users/:userId/tasks/:taskId"
  element={
    <ProtectedRoute>
      <AdminTaskDetails />
    </ProtectedRoute>
  }
/>

      </Routes>
      </SidebarProvider>
    </BrowserRouter>
  );
}

export default App;