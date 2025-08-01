import express from "express";
import { createPerformance, deletePerformance, getPerformanceById, getPerformances, updatePerformance} from "../controllers/performancesController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getPerformances)
router.get("/:id", getPerformanceById);
router.post("/", protect, createPerformance)
router.put("/:id", protect, updatePerformance);
router.delete("/:id", protect, deletePerformance)

export default router;