const functions = require("../../models/contacts");
const postFunc = async (req, res, next) => {
  const contact = await functions.addContact(req.body);
  res.status(201).json({ ...contact });
};
module.exports = postFunc;
