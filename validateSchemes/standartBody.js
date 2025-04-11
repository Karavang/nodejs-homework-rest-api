const Joi = require("joi");
const standartBody = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required()
    .messages({
      "any.required": "missing required email field",
      "string.email": "invalid email format",
    }),
  password: Joi.string().pattern(/^[a-zA-Z0-9@#$%^&+=*!_-]*$/),
});
module.exports = standartBody;
