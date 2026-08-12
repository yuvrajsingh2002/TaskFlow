import { useEffect, useState } from "react";
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
    <div className="bg-white rounded-xl shadow p-6 mt-8">

      <h2 className="text-xl font-bold mb-5">
        Recent Activity
      </h2>

      {loading ? (
        <p className="text-gray-500">
          Loading activity...
        </p>
      ) : activities.length === 0 ? (
        <p className="text-gray-500">
          No recent activity
        </p>
      ) : (
        <div className="space-y-4">

          {activities.map((activity) => (
            <div
              key={activity._id}
              className="border-b pb-4 last:border-b-0"
            >
              <p className="font-medium">
                {activity.action}
              </p>

              <p className="text-gray-600">
                "{activity.taskTitle}"
              </p>

              <p className="text-sm text-gray-400 mt-1">
                {new Date(activity.createdAt).toLocaleString("en-IN")}
              </p>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default ActivityLog;