const express = require("express");
const functions = require("../../models/contacts.json");
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
  res.json({ message: "template message" });
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
