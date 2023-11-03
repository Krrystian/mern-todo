//Token verification for access to webpages
import jwt from "jsonwebtoken";

const verifyToken = (req, res) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(401).send("Access Denied.");
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    token = jwt.decode(token);
    if (token) {
      const expTime = token.exp;
      const nowTime = Math.floor(new Date() / 1000);
      if (nowTime > expTime) {
        return res.status(401).json({ message: "Token expired." });
      }
    }

    res.status(200).json({ message: "Token verified.", token: token });
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};
export default verifyToken;
