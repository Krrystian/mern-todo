import express from "express";
import { newTodoList, getTodoList } from "../controllers/todo.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
router.post("/newTodoList", verifyToken, newTodoList);
router.get("/getTodoList", verifyToken, getTodoList);
export default router;
