import express from "express";
import { getDashboardData, getTasksData, getUsersData } from "../controllers/dashboardController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getDashboardData);
router.get("/tasks", protect, getTasksData);
router.get("/users", protect, getUsersData);

export default router;
