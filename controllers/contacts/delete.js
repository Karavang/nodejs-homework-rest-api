const functions = require("../../models/contacts");

const deleteFunc = async (req, res, next) => {
  try {
    await functions.removeContact(req.params.contactId);
    res.status(200);
    res.json({ message: "contact deleted" });
  } catch (error) {
    res.status(404);
    res.json({ message: "Not found" });
  }
};

module.exports = deleteFunc;
