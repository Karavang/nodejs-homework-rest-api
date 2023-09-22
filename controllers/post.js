const functions = require("../models/contacts");
const postFunc = async (req, res, next) => {
  if (req.body.name && req.body.email && req.body.phone) {
    const contact = await functions.addContact(req.body);
    res.status(201).json({ ...contact });
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
};
module.exports = postFunc;
