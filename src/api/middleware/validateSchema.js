module.exports = (schema) => async (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: true, message: error.errors });
  }
};
