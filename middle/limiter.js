const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 70,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});
module.exports = limiter;
