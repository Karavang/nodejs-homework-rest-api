const express = require("express");
const functions = require("../../models/contacts.js");
const Joi = require("joi");
const router = express.Router();
const createError = (ERROR_TYPE, { message, data }) => {
  return { type: ERROR_TYPE, message, data };
};
const ERROR_TYPES = {
  BAD_REQUEST: "BAD_REQUEST",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
};

const standartBody = Joi.object({
  id: Joi.string(),
  name: Joi.string().alphanum().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.number().required(),
});
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
router.get("/", async (req, res, next) => {
  try {
    const contacts = await functions.listContacts();
    res.json(contacts);
    res.status(200);
  } catch (error) {
    next(error);
    console.log(functions);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await functions.getContactById(req.params.contactId);

    res.json(contact);
    res.status(200);
  } catch (error) {
    res.json({ message: "Not found" });
    res.status(404);
  }
});

router.post("/", [validateBody(standartBody)], async (req, res, next) => {
  console.log(req.body);
  if (req.body.name && req.body.email && req.body.phone) {
    await functions.addContact(req.body);
    res.status(201);
  } else {
    res.json({ message: "missing required name field" });
    res.status(400);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    await functions.removeContact(req.params.contactId);
    res.json({ message: "contact deleted" });
    res.status(200);
  } catch (error) {
    res.json({ message: "Not found" });
    res.status(404);
  }
});

router.put(
  "/:contactId",
  [validateBody(standartBody)],
  async (req, res, next) => {
    try {
      if (req.body.name && req.body.email && req.body.phone) {
        await functions.changeContact(req.params.contactId, req.body);
        res.status(201);
      } else {
        res.json({ message: "missing fields" });
        res.status(400);
      }
    } catch (e) {
      res.json({ message: "Not found" });
      res.status(404);
    }
  }
);

module.exports = router;
