const express = require("express");
const functions = require("../../models/contacts.js");
const router = express.Router();

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

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
