const jwt = require("jsonwebtoken");
const Auth = (req, res, next) => {
  const token = req.cookies.token;
  console.log("Token:", token);

  if (!token) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err || !decoded) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
console.log("Decoded Token:", decoded);
    req.user = decoded;  
    next();
  });
};

module.exports = Auth;
