import jwt from "jsonwebtoken";

export function generateToken(user, res) {
  const token = jwt.sign(
    { userId: user._id, name: user.name, email: user.email },
    "vdmnvoin"
  );

  return res.cookie("token", token);
}

export function getuser(token) {
  try {
    const user = jwt.verify(token,"vdmnvoin");
    return user;
  }
  catch(err){
    return null
  }
}

