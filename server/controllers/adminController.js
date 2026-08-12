import User from "../models/User.js";
import Task from "../models/Task.js";
import ActivityLog from "../models/ActivityLog.js";


// ===============================
// GET ALL USERS
// ===============================

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      role: "user",
    })
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ===============================
// GET SINGLE USER DETAILS
// ===============================

export const getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      _id: id,
      role: "user",
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const tasks = await Task.find({
      createdBy: id,
    }).sort({
      createdAt: -1,
    });

    const activities = await ActivityLog.find({
      user: id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      user,
      tasks,
      activities,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ===============================
// GET ADMIN TASK DETAILS
// ===============================

export const getAdminTaskDetails = async (req, res) => {
  try {
    const { userId, taskId } = req.params;

    const user = await User.findById(userId)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const task = await Task.findOne({
      _id: taskId,
      createdBy: userId,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
      task,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAllActivityLogs = async (req, res) => {
  try {

    const activities = await ActivityLog.find()
      .populate("user", "name email")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      activities,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// Get admin activity logs
export const getAdminActivities = async (req, res) => {
  try {

    const activities = await ActivityLog.find({
      user: req.user.id,
    })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count:activities.length,
      activities,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
