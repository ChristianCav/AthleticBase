import express from "express";
import { createPerformance, deletePerformance, getAllPerformances, getPerformances, updatePerformance} from "../controllers/performancesController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getPerformances)
router.get("/all", getAllPerformances);
router.post("/", protect, createPerformance)
router.put("/:id", protect, updatePerformance);
router.delete("/:id", protect, deletePerformance)

export default router;