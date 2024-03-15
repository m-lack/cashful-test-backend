const { auth } = require("../services/supabase");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  const { user, error } = await auth.getUser(token);

  if (error)
    return res.status(401).json({
      message: error.message,
    });

  req.user = user;
  next();
};
