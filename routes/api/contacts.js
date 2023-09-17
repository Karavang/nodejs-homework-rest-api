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
  id: Joi.any(),
  name: Joi.string().alphanum(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.number(),
  favorite: Joi.boolean(),
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
    res.status(200);
    res.json(contacts);
  } catch (error) {
    next(error);
    console.log(functions);
  }
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await functions.getContactById(req.params.contactId);
  console.log(contact);
  if (contact === undefined) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.status(200).json(contact);
  }
});

router.post("/", [validateBody(standartBody)], async (req, res, next) => {
  console.log(req.body);
  if (req.body.name && req.body.email && req.body.phone) {
    const contact = await functions.addContact(req.body);
    res.status(201);
    res.json({ ...contact });
  } else {
    res.status(400);
    const missingFields = [];
    if (!req.body.name) {
      missingFields.push("name");
    }
    if (!req.body.email) {
      missingFields.push("email");
    }
    if (!req.body.phone) {
      missingFields.push("phone");
    }
    res.json({
      message: `missing required ${missingFields.join(", ")} field`,
    });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    await functions.removeContact(req.params.contactId);
    res.status(200);
    res.json({ message: "contact deleted" });
  } catch (error) {
    res.status(404);
    res.json({ message: "Not found" });
  }
});

router.put(
  "/:contactId",
  [validateBody(standartBody)],
  async (req, res, next) => {
    try {
      if (req.body.name || req.body.email || req.body.phone) {
        if (req.body.name && req.body.email && req.body.phone) {
          const newContact = { id: req.params.contactId, ...req.body };
          await functions.changeContact(req.params.contactId, req.body);
          res.status(200).json(newContact);
        } else {
          res.status(400);
          const missingFields = [];
          if (!req.body.name) {
            missingFields.push("name");
          }
          if (!req.body.email) {
            missingFields.push("email");
          }
          if (!req.body.phone) {
            missingFields.push("phone");
          }
          res.json({
            message: `missing required ${missingFields.join(", ")} field`,
          });
        }
      } else {
        res.status(400).json({ message: "Missing fields" });
        return;
      }
    } catch (e) {
      console.log(e);
      res.status(404).json({ message: "Not found" });
    }
  }
);

module.exports = router;
