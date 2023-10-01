const { isValidObjectId } = require("mongoose");

const HttpError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const isValidId = (req, res, next) => {
  const id = req.params.contactId;
  if (!isValidObjectId(id)) {
    next(HttpError(400, `${id} is not valid id`));
  }
  next();
};

module.exports = isValidId;
