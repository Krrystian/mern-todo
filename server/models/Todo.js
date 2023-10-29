import mongoose from "mongoose";

var TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: mongoose.Schema.Types.ObjectId,
      default: [],
      ref: "TodoElement",
    },
    uncompleted: {
      type: mongoose.Schema.Types.ObjectId,
      default: [],
      ref: "TodoElement",
    },
    inProgress: {
      type: mongoose.Schema.Types.ObjectId,
      default: [],
      ref: "TodoElement",
    },
    users: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;
