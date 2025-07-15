import express from "express";
import { createPerformance, deletePerformance, getAllPerformances, updatePerformance, getPerformanceById, getUserPerformances } from "../controllers/performancesController.js";

const router = express.Router();

router.get("/", getAllPerformances)
router.get("/:id", getPerformanceById)
router.get("/user/:userId", getUserPerformances)
router.post("/", createPerformance)
router.put("/:id", updatePerformance);
router.delete("/:id", deletePerformance)

export default router;