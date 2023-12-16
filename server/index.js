import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import verifyToken from "./controllers/verifyToken.js";
import todoRoute from "./routes/todo.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));

const corsOptions = {
  origin: "https://mern-todo-frontend-nine.vercel.app",
  //origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());

app.post("/verify", verifyToken);
// Routes
app.use("/", authRoute);
app.use("/user", userRoute);
app.use("/todo", todoRoute);

// DB Config
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
