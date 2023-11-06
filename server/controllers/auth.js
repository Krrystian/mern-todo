import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Missing email or password" });
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(401).json({ message: "Something went wrong" });
  }
  const matchPasswd = await bcrypt.compare(password, user.password);
  if (!matchPasswd) {
    return res.status(401).json({ message: "Something went wrong" });
  }
  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: user.userName,
        email: user.email,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m", //change
    }
  );
  const refreshToken = jwt.sign(
    {
      UserInfo: {
        email: user.email,
      },
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true, // for safari false!!
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });
  res.status(200).json({
    token: accessToken,
    username: user.userName,
    email: user.email,
    id: user._id,
  });
};

export const refresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.refreshToken) {
    return res.status(401).json({ message: "refreshToken not found" });
  }
  jwt.verify(
    cookies.refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Refresh token Invalid." });
      }

      const foundUser = await User.findOne({ email: decoded.UserInfo.email });
      if (!foundUser)
        return res.status(401).json({ message: "User not found." });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.userName,
            email: foundUser.email,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15m", //change
        }
      );
      return res.status(200).json({
        token: accessToken,
      });
    }
  );
};
export const logout = async (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.status(200).json({ message: "Logged out" });
};
