const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
  if (!req.session.userId) return res.redirect("/");
  const user = await User.findById(req.session.userId);
  if (!user) return res.redirect("/");
  req.user = user;
  next();
};

module.exports = authMiddleware;
