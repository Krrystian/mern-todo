import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(401).send("Access Denied.");
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = verified.UserInfo.username;
    req.email = verified.UserInfo.email;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
