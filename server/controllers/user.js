import bcrypt from "bcrypt";
import User from "../models/User.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  const duplicate = await User.findOne({
    $or: [{ email: email }, { username: username }],
  });
  if (duplicate) {
    return res.status(400).send({ message: "Something went wrong." });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    userName: username,
    email: email,
    password: hashedPassword,
  });
  try {
    await user.save();
    res.status(200).json({ message: "User created successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
