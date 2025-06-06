const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  const token = req.cookies.access_token;


  if (!token) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err || !decoded) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = decoded.userData;
    next();
  });
};

module.exports = isAuth;