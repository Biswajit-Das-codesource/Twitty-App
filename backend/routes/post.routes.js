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
import multer from "multer"
const app = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

app.post("/send", upload.single("file"),checkAuth, handleSendPost);

app.post("/like/:id", checkAuth, handleLikes);
app.post("/comment/:id", checkAuth, handleComments);
app.get("/feeds",handleAllfeeds)
app.delete("/delete/:id",handleDelete)
app.get("/getpost/:id",handleGetOnePost)
export default app;
