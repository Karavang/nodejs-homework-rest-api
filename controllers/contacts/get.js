const functions = require("../../models/contacts");
const getFunc = async (req, res, next) => {
  try {
    const contacts = await functions.listContacts();
    const ownersContacts = contacts.filter(
      (e) => e.owner.toString() === req.user.id
    );
    res.status(200).json(ownersContacts);
  } catch (error) {
    next(error);
  }
};
module.exports = getFunc;
// === req.user.id
