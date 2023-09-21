const functions = require("../models/contacts");
const putFunc = async (req, res, next) => {
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
};
module.exports = putFunc;
