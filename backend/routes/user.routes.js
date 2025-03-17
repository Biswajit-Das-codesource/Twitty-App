import express from "express";
import {
  handleBookMark,
  handleEditProfile,
  handleFollower,
  handleLogin,
  handleRegister,
  handleUserProfile,
} from "../controller/user.controller.js";
import { checkAuth } from "../middlewares/auth.js";

const app = express.Router();

app.post("/signup", handleRegister);
app.post("/login", handleLogin);
app.get("/profile/:id",checkAuth,handleUserProfile)
app.put("/follow/:id", checkAuth, handleFollower);
app.post("/bookmark/:id", checkAuth, handleBookMark);
app.put("/editprofile",checkAuth,handleEditProfile)
export default app;
