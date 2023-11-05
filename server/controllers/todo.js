import bcrypt from "bcrypt";
import TodoList from "../models/todo.js";
import User from "../models/User.js";

export const newTodoList = async (req, res) => {
  try {
    const { title, password, id } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    if (password) {
      password = await bcrypt.hash(password, 10);
    }
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(401).json({ message: "Someething went wrong" });
    }
    const todoList = new TodoList({
      title,
      password,
    });
    await todoList.save();
    user.todos.push(todoList);
    await user.save();
    return res.status(201).json({ title: todoList.title, id: todoList._id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTodoList = async (req, res) => {
  try {
    const { id } = req.query;
    const user = await User.findOne({ _id: id }).populate({
      path: "todos",
      select: "-password",
    });
    return res.status(200).json({ todos: user.todos });
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};
