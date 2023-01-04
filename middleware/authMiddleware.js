const jwt = require("jsonwebtoken");

exports.authMiddleware = async (req, res, next) => {
  const token = req.header("authorization").split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Token is not valid", success: false });
      } else {
        req.body.userId = decoded.id;
        next();
      }
    });
  } catch (err) {
    res.status(401).json({ message: "Token is not valid", success: false });
  }
};
