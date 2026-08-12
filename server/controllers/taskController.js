import Task from "../models/Task.js";
import mongoose from "mongoose";
import ActivityLog from "../models/ActivityLog.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, priority, status, dueDate } = req.body;
    let completedAt = null;
    if (status === "Completed") {
      completedAt = new Date();
    }

    const task = await Task.create({
  title,
  description,
  priority,
  status,
  dueDate,
  completedAt,
  createdBy: req.user.id,
});
    await ActivityLog.create({
  user: req.user.id,
  action: "Created task",
  task: task._id,
  taskTitle: task.title,
});

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTasks = async (req, res) => {
  try {
    
    const tasks = await Task.find({
      createdBy: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Task ID",
      });
    }

    const task = await Task.findOne({
      _id: id,
      createdBy: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    

    res.status(200).json({
      success: true,
      task,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Task
export const updateTask = async (req, res) => {
  try {

    const updateData = { ...req.body };

    if (req.body.status === "Completed") {
      updateData.completedAt = new Date();
    }

    if (req.body.status !== "Completed") {
      updateData.completedAt = null;
    }

    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user.id,
      },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await ActivityLog.create({
      user: req.user.id,
      action: "Updated task",
      task: task._id,
      taskTitle: task.title,
    });

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await ActivityLog.create({
  user: req.user.id,
  action: "Deleted task",
  task: task._id,
  taskTitle: task.title,
});

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};