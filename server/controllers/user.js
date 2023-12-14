import bcrypt from "bcrypt";
import User from "../models/User.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  const duplicate = await User.findOne({
    $or: [{ email: email }, { username: username }],
  });
  if (duplicate) {
    return res.status(404).send({ message: "Something went wrong." });
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
export const newEmail = async (req, res) => {
  try {
    const { email, id } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: "Something went wrong." });
    }
    if (user.email === email) {
      return res.status(400).send({ message: "Email already in use." });
    }
    user.email = email;
    await user.save();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const newPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, id } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: "Something went wrong." });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(403).send({ message: "Incorrect password." });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const newUsername = async (req, res) => {
  try {
    const { username, id } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: "Something went wrong." });
    }
    if (user.userName === username) {
      return res.status(400).send({ message: "Username already in use." });
    }
    user.userName = username;
    await user.save();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
