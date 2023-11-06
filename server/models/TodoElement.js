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
    threeStep: {
      type: Boolean,
      default: false,
    },
    progress: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const TodoElement = mongoose.model("TodoElement", TodoElementSchema);

export default TodoElement;
