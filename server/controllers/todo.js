import bcrypt from "bcrypt";
import TodoList from "../models/todo.js";
import User from "../models/User.js";

export const newTodoList = async (req, res) => {
  try {
    const { title, password, id } = req.body;
    let passwordHash = "";
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    if (password) {
      passwordHash = await bcrypt.hash(password, 10);
    }
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(401).json({ message: "Someething went wrong" });
    }
    const todoList = new TodoList({
      title,
      password: passwordHash,
    });
    await todoList.save();
    user.todos.push(todoList);
    await user.save();
    const sterilizedTodoList = {
      title: todoList.title,
      _id: todoList._id,
      completed: todoList.completed,
      uncompleted: todoList.uncompleted,
      inProgress: todoList.inProgress,
    };
    return res.status(201).json(sterilizedTodoList);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTodoList = async (req, res) => {
  try {
    const { id } = req.query;
    const user = await User.findOne({ _id: id }).populate({
      path: "todos",
      match: { active: true },
      select: "-password -active -__v -createdAt -updatedAt",
    });
    return res.status(200).json({ todos: user.todos });
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};

export const removeTodoList = async (req, res) => {
  try {
    const { id } = req.body;
    const todoList = await TodoList.findOne({ _id: id });
    if (!todoList) {
      return res.status(404).json({ message: "Todo list not found" });
    }
    todoList.active = false;
    await todoList.save();
    return res.status(200).json({ message: "Todo list removed" });
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};

export const joinTodoList = async (req, res) => {
  try {
    const { id, code, password } = req.body;
    const todoList = await TodoList.findById(code);
    if (!todoList) {
      return res.status(404).json({ message: "Something went wrong" });
    }
    if (todoList.password) {
      const isMatch = await bcrypt.compare(password, todoList.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Something went wrong" });
      }
    } else {
      const passwd = "";
      const isMatch = await bcrypt.compare(password, passwd);
      if (!isMatch) {
        return res.status(401).json({ message: "Something went wrong" });
      }
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Something went wrong" });
    }
    user.todos.push(todoList);
    await user.save();

    const sterilizedTodoList = {
      title: todoList.title,
      _id: todoList._id,
      completed: todoList.completed,
      uncompleted: todoList.uncompleted,
      inProgress: todoList.inProgress,
    };
    return res.status(200).json(sterilizedTodoList);
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};
export const changeTitle = async (req, res) => {
  try {
    const { id, title } = req.body;
    const todoList = await TodoList.findById(id);
    if (!todoList) {
      return res.status(404).json({ message: "Something went wrong" });
    }
    todoList.title = title;
    await todoList.save();
    const sterilizedTodoList = {
      title: todoList.title,
      _id: todoList._id,
      completed: todoList.completed,
      uncompleted: todoList.uncompleted,
      inProgress: todoList.inProgress,
    };
    return res.status(200).json(sterilizedTodoList);
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    let { id, password } = req.body;
    const todoList = await TodoList.findById(id);
    if (!todoList) {
      return res.status(404).json({ message: "NotFound" });
      const password = await bcrypt.hash(password, 10);
    }
    if (!password) {
      password = "";
    }
    todoList.password = password;
    await todoList.save();
    return res.status(200).json({ message: "Password changed" });
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};
