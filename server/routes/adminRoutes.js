import express from "express";

import {
  getAllUsers,
  getUserDetails,
  getAdminTaskDetails,
  getAdminActivities,
} from "../controllers/adminController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();


// ===============================
// ADMIN DASHBOARD - ALL USERS
// ===============================
router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  getAllUsers
);


// ===============================
// ADMIN - USER DETAILS
// ===============================
router.get(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  getUserDetails
);


// ===============================
// ADMIN - TASK DETAILS
// ===============================
router.get(
  "/users/:userId/tasks/:taskId",
  authMiddleware,
  adminMiddleware,
  getAdminTaskDetails
);


// ===============================
// ADMIN - ACTIVITY LOGS
// ===============================
router.get(
  "/activity",
  authMiddleware,
  adminMiddleware,
  getAdminActivities
);


export default router;