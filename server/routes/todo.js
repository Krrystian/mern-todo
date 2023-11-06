import express from "express";
import {
  newTodoList,
  getTodoList,
  removeTodoList,
} from "../controllers/todo.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
router.post("/newTodoList", verifyToken, newTodoList);
router.get("/getTodoList", verifyToken, getTodoList);
router.put("/removeTodoList", verifyToken, removeTodoList);
export default router;
