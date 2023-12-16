//import bcrypt from "bcrypt";
import bcrypt from "bcryptjs";
import TodoList from "../models/Todo.js";
import User from "../models/User.js";
import TodoElement from "../models/TodoElement.js";
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
      populate: [
        { path: "completed", select: "-__v -createdAt -updatedAt" },
        { path: "uncompleted", select: "-__v -createdAt -updatedAt" },
        { path: "inProgress", select: "-__v -createdAt -updatedAt" },
      ],
    });
    return res.status(200).json({ todos: user.todos });
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};

export const removeTodoList = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
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
    const todoList = await TodoList.findById(code)
      .populate("inProgress", "-__v -createdAt -updatedAt")
      .populate("uncompleted", "-__v -createdAt -updatedAt")
      .populate("completed", "-__v -createdAt -updatedAt");
    if (!todoList) {
      return res.status(404).json({ message: "Something went wrong" });
    }
    if (todoList.password) {
      const isMatch = await bcrypt.compare(password, todoList.password);
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
      return res.status(404).json({ message: "Not Found" });
    }
    if (!password) {
      password = "";
    } else {
      password = await bcrypt.hash(password, 10);
    }
    todoList.password = password;
    await todoList.save();
    return res.status(200).json({ message: "Password changed" });
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};
//============================================TASK=======================================================
export const newTask = async (req, res) => {
  try {
    const { title, description, stage, format, id } = req.body;
    const todoList = await TodoList.findById(id);
    if (!todoList) {
      return res.status(404).json({ message: "Todo list not found" });
    }
    const task = new TodoElement({
      title,
      description,
      progressInclude: format,
      progressStage: stage,
    });
    todoList[stage].push(task);
    await task.save();
    await todoList.save();
    const serializeTask = {
      _id: task._id,
      title: task.title,
      description: task.description,
      progressInclude: task.progressInclude,
      progressStage: task.progressStage,
    };
    return res.status(201).json(serializeTask);
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};
export const removeTask = async (req, res) => {
  try {
    const { id } = req.body;
    const task = await TodoElement.findByIdAndRemove(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ message: "Task removed" });
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};
export const updateTask = async (req, res) => {
  try {
    const {
      id,
      title,
      description,
      stage,
      format,
      currentStage,
      selectedList,
    } = req.body;
    const task = await TodoElement.findById(id);
    const todoList = await TodoList.findById(selectedList);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (!todoList) {
      return res.status(404).json({ message: "Todo list not found" });
    }
    if (currentStage !== stage) {
      const index = todoList[currentStage].indexOf(id);
      todoList[currentStage].splice(index, 1);
      todoList[stage].push(id);
      await todoList.save();
    }
    task.title = title;
    task.description = description;
    task.progressStage = stage;
    task.progressInclude = format;
    await task.save();
    const serializeTask = {
      _id: task._id,
      title: task.title,
      description: task.description,
      progressInclude: task.progressInclude,
      progressStage: task.progressStage,
    };
    return res.status(200).json(serializeTask);
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};

export const changeTaskStatus = async (req, res) => {
  try {
    const { id, stage } = req.body;
    const task = TodoElement.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.progressStage = stage;
    await task.save();
    const serializeTask = {
      _id: task._id,
      title: task.title,
      description: task.description,
      progressInclude: task.progressInclude,
      progressStage: task.progressStage,
    };
    return res.status(200).json(serializeTask);
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};
