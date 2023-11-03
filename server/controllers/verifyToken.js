//Token verification for access to webpages
import jwt from "jsonwebtoken";

const verifyToken = (req, res) => {
  let token = req.header("Authorization");
  if (!token) {
    return res.status(401).send("Access Denied.");
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trimLeft();
  } else {
    return res.status(401).send("Access Denied.");
  }

  token = jwt.decode(token);
  if (token) {
    const expTime = token.exp;
    const nowTime = Math.floor(new Date() / 1000);
    if (nowTime >= expTime) {
      return res.status(403).json({ message: "Token expired." });
    }
  }
  res.status(200).json({ message: "Token verified." });
};
export default verifyToken;
