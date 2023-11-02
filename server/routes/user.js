import express from "express";
import { register } from "../controllers/user.js";
import e from "express";

const router = express.Router();
router.post("/register", register);

export default router;
