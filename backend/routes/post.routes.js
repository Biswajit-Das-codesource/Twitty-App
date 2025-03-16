import express from "express";
import {
  handleAllfeeds,
  handleComments,
  handleDelete,
  handleGetOnePost,
  handleLikes,
  handleSendPost,
} from "../controller/post.controller.js";
import { checkAuth } from "../middlewares/auth.js";

const app = express.Router();

app.post("/send", checkAuth, handleSendPost);
app.post("/like/:id", checkAuth, handleLikes);
app.post("/comment/:id", checkAuth, handleComments);
app.get("/feeds",handleAllfeeds)
app.delete("/delete/:id",handleDelete)
app.get("/getpost/:id",handleGetOnePost)
export default app;
