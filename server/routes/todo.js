import express from "express";
import {
  newTodoList,
  getTodoList,
  removeTodoList,
  joinTodoList,
} from "../controllers/todo.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
router.post("/newTodoList", verifyToken, newTodoList);
router.get("/getTodoList", verifyToken, getTodoList);
router.put("/removeTodoList", verifyToken, removeTodoList);
router.post("/joinTodoList", verifyToken, joinTodoList);
export default router;
