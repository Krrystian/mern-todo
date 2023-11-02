import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Missing email or password" });
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(401).json({ message: "Something went wrong" });
  }
  const matchPasswd = await bcrypt.compare(password, user.password);
  if (!matchPasswd) {
    res.status(401).json({ message: "Something went wrong" });
  }
  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: user.UserName,
        email: user.email,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );
  const refreshToken = jwt.sign(
    {
      UserInfo: {
        username: user.UserName,
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
    secure: true,
    expiresIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    path: "/api/refresh", //Cookie will be refreshed when visiting
  });

  res.status(200).json({ accessToken: accessToken });
};
export const refresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.refreshToken) {
    res.status(401).json({ message: "Something went wrong" });
  }
  jwt.verify(
    cookies.refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Something went wrong" });
      }

      const foundUser = await User.findOne({ username: decoded.username });
      if (!foundUser)
        return res.status(401).json({ message: "Something went wrong" });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
            email: foundUser.email,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15m",
        }
      );
      res.status(200).json({ accessToken: accessToken });
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
