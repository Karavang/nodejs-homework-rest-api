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

router.put("/:contactId", async (req, res, next) => {
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
});

module.exports = router;
