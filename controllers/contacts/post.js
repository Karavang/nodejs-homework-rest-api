const functions = require("../../models/contacts");
const postFunc = async (req, res, next) => {
  const contactWithOwner = { ...req.body, owner: req.user.id };
  const contact = await functions.addContact(contactWithOwner);
  res.status(201).json({ ...contact });
};
module.exports = postFunc;
