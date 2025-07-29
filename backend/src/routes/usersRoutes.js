import express from "express"
import { getAllUsers, getMe, createUser, updateUser, deleteUser, loginUser, getStats } from "../controllers/usersController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllUsers)
router.get("/me", protect, getMe);
router.get("/stats", protect, getStats)
router.post("/signup", createUser)
router.post("/login", loginUser)
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser)

export default router;