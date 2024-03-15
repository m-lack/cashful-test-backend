const { auth } = require("../services/supabase");

const Signup = async (req, res) => {
  let { display_name, email, password } = req.body;

  let credentials = {
    display_name,
    email,
    password,
  };

  const { user, error } = await auth.createUser(credentials);

  if (error)
    return res
      .status(error.status)
      .json({ error: true, message: error.message });

  res.status(200).json({
    error: false,
    message: "User registred successfuly!",
    user,
  });
};

const Signin = async (req, res) => {
  let { email, password } = req.body;

  let credentials = {
    email,
    password,
  };

  const { token, error } = await auth.SigninWithPassword(credentials);

  if (error)
    return res
      .status(error.status)
      .json({ error: true, message: error.message });

  res.status(200).json({
    error: false,
    message: "User signed successfuly!",
    token,
  });
};

const Verify = async (req, res) => {
  const { tokenHash } = req.params;

  const { user, error } = await auth.verifyEmail(tokenHash);

  if (error)
    return res
      .status(error.status)
      .json({ error: true, message: error.message });
  else if (user) return res.redirect(`${process.env.CLIENT_URL}/signin`);
};

module.exports = {
  Signup,
  Signin,
  Verify,
};
