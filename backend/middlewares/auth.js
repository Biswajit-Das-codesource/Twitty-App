import { getuser } from "../utils/generateToken.js";

export async function checkAuth(req, res, next) {
  const token = req?.cookies?.token;

  if (!token) {
    return res.status(400).json({
      message: "Login first",
      success: false,
    });
  }
  console.log(token);
  const user = getuser(token);
  if (!user) return;

  req.user = user;
  next();
}
