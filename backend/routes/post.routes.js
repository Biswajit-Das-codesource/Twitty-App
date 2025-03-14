import express from "express";
import {
  handleAllfeeds,
  handleComments,
  handleLikes,
  handleSendPost,
} from "../controller/post.controller.js";
import { checkAuth } from "../middlewares/auth.js";

const app = express.Router();

app.post("/send", checkAuth, handleSendPost);
app.post("/like/:id", checkAuth, handleLikes);
app.post("/comment/:id", checkAuth, handleComments);
app.get("/feeds",handleAllfeeds)
export default app;
