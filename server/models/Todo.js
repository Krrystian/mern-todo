import mongoose from "mongoose";

var TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      default: "",
    },
    active: {
      type: Boolean,
      default: true,
    },
    completed: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TodoElement",
      },
    ],
    uncompleted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TodoElement",
      },
    ],
    inProgress: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TodoElement",
      },
    ],
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;
