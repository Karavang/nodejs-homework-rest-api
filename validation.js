const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { body } = req;
    const { error } = schema.validate(body);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }
    next();
  };
  return func;
};
module.exports = validateBody;
