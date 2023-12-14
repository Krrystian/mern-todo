import express from "express";
import {
  register,
  newEmail,
  newPassword,
  newUsername,
} from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();
router.post("/register", verifyToken, register);
router.post("/newPassword", verifyToken, newPassword);
router.post("/newUsername", verifyToken, newUsername);
router.post("/newEmail", verifyToken, newEmail);

export default router;
