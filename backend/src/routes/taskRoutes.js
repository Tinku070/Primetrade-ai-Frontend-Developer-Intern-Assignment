import express from "express";
import { getTasks, addTask, deleteTask } from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getTasks);
router.post("/", protect, addTask);
router.delete("/:id", protect, deleteTask);

export default router;
