const createError = (ERROR_TYPE, { message, data, status }) => {
  return { type: ERROR_TYPE, message, data, status: 400 };
};
const validate = (target) => (schema) => (req, res, next) => {
  const result = schema.validate(req[target]);
  if (result.error) {
    const custorError = createError(ERROR_TYPES.BAD_REQUEST, {
      data: result.error,
      message: result.error.message,
    });
    next(custorError);
  } else {
    next();
  }
};
const validateBody = validate("body");

const ERROR_TYPES = {
  BAD_REQUEST: "BAD_REQUEST",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
};
module.exports = validateBody;
