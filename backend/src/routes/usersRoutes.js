import express from "express"
import { getAllUsers, getMe, createUser, updateUser, deleteUser, loginUser } from "../controllers/usersController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllUsers)
router.get("/me", protect, getMe);
router.post("/signup", createUser)
router.post("/login", loginUser)
router.put("/:id", updateUser);
router.delete("/:id", deleteUser)

export default router;