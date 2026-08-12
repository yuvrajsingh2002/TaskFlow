import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function ActivityLog() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchActivities = async () => {
    try {
      const { data } = await api.get("/activities");
      setActivities(data.activities);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">

          <h1 className="text-3xl font-bold mb-8">
            Activity Log
          </h1>

          <div className="bg-white rounded-xl shadow p-6">

            {loading ? (
              <p className="text-gray-500 text-center py-10">
                Loading activity...
              </p>
            ) : activities.length === 0 ? (
              <p className="text-gray-500 text-center py-10">
                No activity found.
              </p>
            ) : (
              <div className="space-y-4">

                {activities.map((activity) => (
                  <div
                    key={activity._id}
                    className="border-b pb-4 last:border-b-0"
                  >
                    <div className="flex justify-between items-start">

                      <div>
                        <p className="font-semibold">
                          {activity.action}
                        </p>

                        <p className="text-gray-600 mt-1">
                          Task: {activity.taskTitle}
                        </p>
                      </div>

                      <p className="text-sm text-gray-500">
                        {new Date(
                          activity.createdAt
                        ).toLocaleString("en-US")}
                      </p>

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

export default ActivityLog;