import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    action: {
      type: String,
      required: true,
    },

    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },

    taskTitle: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ActivityLog = mongoose.model(
  "ActivityLog",
  activityLogSchema
);

export default ActivityLog;