const functions = require("../../models/contacts");
const getByIdFunc = async (req, res, next) => {
  console.log(req.user.id);
  const contact = await functions.getContactById(req.params.contactId);

  if (contact === undefined || contact.owner.toString() !== req.user.id) {
    res.status(404).json({ message: "Not found" });
  } else {
    console.log(contact);

    res.status(200).json(contact);
  }
};
module.exports = getByIdFunc;
