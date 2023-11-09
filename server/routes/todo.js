import express from "express";
import {
  newTodoList,
  getTodoList,
  removeTodoList,
  joinTodoList,
  changeTitle,
  changePassword,
  newTask,
} from "../controllers/todo.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
router.post("/newTodoList", verifyToken, newTodoList);
router.get("/getTodoList", verifyToken, getTodoList);
router.put("/removeTodoList", verifyToken, removeTodoList);
router.put("/joinTodoList", verifyToken, joinTodoList);
router.put("/changeTitle", verifyToken, changeTitle);
router.put("/changePassword", verifyToken, changePassword);
router.post("/newTask", verifyToken, newTask);
export default router;
