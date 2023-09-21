const functions = require("../models/contacts");
const getByIdFunc = async (req, res, next) => {
  const contact = await functions.getContactById(req.params.contactId);
  console.log(contact);
  if (contact === undefined) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.status(200).json(contact);
  }
};
module.exports = getByIdFunc;
