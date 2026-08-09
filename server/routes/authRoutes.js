import express from "express";
import {
  signup,
  login,
  getProfile,
  changePassword
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/profile", authMiddleware, getProfile);

router.post("/signup", signup);
router.post("/login", login);
router.put("/change-password", authMiddleware, changePassword);

export default router;