import express from "express";
import { login, refresh, logout } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.get("/refresh", refresh);
router.get("/logout", logout);

export default router;
