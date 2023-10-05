const functions = require("../../models/contacts");

const deleteFunc = async (req, res, next) => {
  try {
    const contactId = await functions.getContactById(req.params.contactId);

    if (contactId.owner.toString() === req.user.id) {
      await functions.removeContact(req.params.contactId);
      res.status(200).json({ message: "contact deleted" });
    }
  } catch (error) {
    res.status(404);
    res.json({ message: "Not found" });
  }
};

module.exports = deleteFunc;
