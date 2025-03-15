import jwt from "jsonwebtoken";

export function generateToken(user, res) {
  const token = jwt.sign(
    { userId: user._id, name: user.name, email: user.email },
    "vdmnvoin"
  );

  return res.cookie("token", token, {
    httpOnly: true, // Prevents client-side access (more secure)
    secure: true, // Ensures it's sent only over HTTPS (disable for localhost)
    sameSite: "Strict", // Prevents CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // Expires in 7 days
  });
}

export function getuser(token) {
  try {
    const user = jwt.verify(token, "vdmnvoin");
    return user;
  } catch (err) {
    return null;
  }
}
