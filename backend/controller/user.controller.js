import userModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

export async function handleRegister(req, res) {
  const { name, password, email, phoneNumber, bio } = req.body;

  if (!name || !password || !email || !phoneNumber) {
    return res.status(400).json({
      message: "All Fields required",
      success: false,
    });
  }

  const isEmail = await userModel.findOne({ email });
  const isPhone = await userModel.findOne({ phoneNumber });

  if (isEmail || isPhone) {
    return res.status(400).json({
      message: "Try with another email,phoneNumber",
      success: false,
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  await userModel.create({
    name,
    password: hashPassword,
    phoneNumber,
    email,
    bio,
  });

  res.status(200).json({
    message: "Register successFully",
    success: true,
  });
}

export async function handleLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All Fields required",
      success: false,
    });
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.json({
      message: "User not founded",
      success: false,
    });
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return res.status(400).json({
      message: "Invalid user",
      success: false,
    });
  }

  generateToken(user, res);
  res.json({
    message: "Login successFully",
    success: true,
    user,
  });
}

export async function handleFollower(req, res) {
  const loggedInUserid = req.user.userId;
  if (!loggedInUserid) {
    return res.status(400).json({
      message: "Invalid Creatials",
      success: false,
    });
  }

  const loggedInUser = await userModel.findById(loggedInUserid);

  const userId = req.params.id;
  const user = await userModel.findById(userId);

  if (!user) {
    return res.status(400).json({
      message: "Invalid Creatials",
      success: false,
    });
  }

  if (!user.follower.includes(loggedInUserid)) {
    await user.updateOne({ $push: { follower: loggedInUserid } });
    await loggedInUser.updateOne({ $push: { following: userId } });
    res.json({
      message: `now your follow ${user.name}`,
      follow: true,
      user,
    });
  } else {
    await user.updateOne({ $pull: { follower: loggedInUserid } });
    await loggedInUser.updateOne({ $pull: { following: userId } });
    res.json({
      message: `now you unfollow ${user.name}`,
      follow: false,
      user,
    });
  }
}

export async function handleBookMark(req, res) {
  const postId = req.params.id;
  const loggedInUserid = req.user.userId;

  const loggedInUser = await userModel.findById(loggedInUserid);

  await loggedInUser.updateOne({ $push: { bookmarks: postId } });

  res.status(200).json({
    message: "Saved successFully",
    success: true,
  });
}

export async function handleUserProfile(req, res) {
  const userId = req.params.id;
  const loggedInUserid = req?.user?.userId;
  const Profileuser = await userModel.findById(userId).populate("following");
  const loggedInUser = await userModel.findById(loggedInUserid);
  if (!userId) {
    return res.json({
      message: "No user Found",
      success: false,
    });
  }

  console.log(loggedInUserid);

  const user = await userModel
    .findById(userId)
    .populate("following")
    .populate("follower");

  if (!user) {
    return res.json({
      message: "No user Found",
      success: false,
    });
  }

  // res.status(200).json({
  //   message: "user Found",
  //   user,
  //   success: true,
  // });
  if (Profileuser.follower.includes(loggedInUserid)) {
    res.json({
      follow: true,
      user,
      loggedInUser,
    });
  } else {
    res.json({
      follow: false,
      user,
      loggedInUser,
    });
  }

  if (!loggedInUserid) {
    return res.status(400).json({
      message: "Invalid",
      success: false,
    });
  }

  if (!user) {
    return res.status(400).json({
      message: "No user found",
      success: false,
    });
  }

  if (!user.profileViews.includes(loggedInUserid)) {
    await user.updateOne({ $push: { profileViews: loggedInUserid } });
  } else {
    return;
  }
}
