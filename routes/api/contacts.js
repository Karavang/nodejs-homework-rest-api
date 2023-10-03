const express = require("express");
const Joi = require("joi");
const router = express.Router();
const validateBody = require("../../validation.js");
const getFunc = require("../../controllers/contacts/get.js");
const getByIdFunc = require("../../controllers/contacts/getById.js");
const postFunc = require("../../controllers/contacts/post.js");
const deleteFunc = require("../../controllers/contacts/delete.js");
const putFunc = require("../../controllers/contacts/put.js");
const patchFunc = require("../../controllers/contacts/patch.js");
const isValidId = require("../../isValidId.js");

const standartBody = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required name field",
  }),
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
  phone: Joi.number().required().messages({
    "any.required": "missing required phone field",
  }),
  favorite: Joi.boolean(),
});

router.get("/", getFunc);
router.get("/:contactId", isValidId, getByIdFunc);

router.post("/", [validateBody(standartBody)], postFunc);

router.delete("/:contactId", isValidId, deleteFunc);

router.put("/:contactId", isValidId, [validateBody(standartBody)], putFunc);
router.patch("/:contactId/favorite", isValidId, patchFunc);

module.exports = router;
