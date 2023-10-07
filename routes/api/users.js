const { Router } = require("express");
const login = require("../../controllers/users/login");
const router = new Router();
const reg = require("../../controllers/users/reg");
const validateBody = require("../../validation.js");
const Joi = require("joi");
const auth = require("../../middlewares/auth");
const current = require("../../controllers/users/current");
const logout = require("../../controllers/users/logout");
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
router.get("/current", auth, current);
router.post("/register", [validateBody(standartBody)], reg);
router.post("/login", [validateBody(standartBody)], login);
router.post("/logout", auth, logout);
module.exports = router;
