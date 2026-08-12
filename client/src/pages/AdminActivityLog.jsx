import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import api from "../services/api";
import Navbar from "../components/Navbar";
import AdminSidebar from "../components/AdminSidebar";

function AdminActivityLog() {

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchActivities = async () => {

    try {

      const { data } = await api.get(
        "/admin/activity"
      );

      setActivities(data.activities || []);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to load activity logs"
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">

      <AdminSidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <h1 className="text-3xl font-bold mb-8">
            Admin Activity Logs
          </h1>

          <div className="bg-white rounded-xl shadow p-6">

            {loading ? (

              <p className="text-gray-500">
                Loading activity...
              </p>

            ) : activities.length === 0 ? (

              <p className="text-gray-500">
                No admin activity found.
              </p>

            ) : (

              <div className="space-y-4">

                {activities.map((activity) => (

                  <div
                    key={activity._id}
                    className="border rounded-lg p-5"
                  >

                    <div className="flex justify-between items-start gap-4">

                      <div>

                        <p className="font-semibold text-lg">
                          {activity.action}
                        </p>

                        {activity.taskTitle && (
                          <p className="text-gray-600 mt-1">
                            Task: {activity.taskTitle}
                          </p>
                        )}

                      </div>

                      <span className="text-sm text-gray-400 whitespace-nowrap">
                        {new Date(
                          activity.createdAt
                        ).toLocaleString("en-US")}
                      </span>

                    </div>

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

export default AdminActivityLog;