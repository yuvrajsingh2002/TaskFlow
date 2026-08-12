import ActivityLog from "../models/ActivityLog.js";

export const getActivities = async (req, res) => {
  try {
    const activities = await ActivityLog.find({
      user: req.user.id,
    })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      count: activities.length,
      activities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};