// const functions = require("../../models/contacts");
const { Contact } = require("../../forDb");
const getFunc = async (req, res, next) => {
  try {
    const ownersContacts = await Contact.find({ owner: req.user.id }).exec();
    res.status(200).json(ownersContacts);
  } catch (error) {
    next(error);
  }
};
module.exports = getFunc;
// === req.user.id
