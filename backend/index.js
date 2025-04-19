import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import postRoutes from "./routes/post.routes.js";
import cors from "cors"
import dotenv from "dotenv"

const app = express();
dotenv.config({})
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
})
);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDb connected"))
  .catch((e) => console.log("error", e));

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
const PORT = 3000;

app.listen(PORT, () => {
  console.log("server started", PORT);
});
