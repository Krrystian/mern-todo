import mongoose from "mongoose";

const TodoElementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    progressInclude: {
      type: Boolean,
      default: false,
    },
    progressStage: {
      type: String,
      default: "uncompleted",
    },
  },
  { timestamps: true }
);

const TodoElement = mongoose.model("TodoElement", TodoElementSchema);

export default TodoElement;
