const functions = require("../models/contacts");
const getFunc = async (req, res, next) => {
  try {
    const contacts = await functions.listContacts();
    res.status(200);
    res.json(contacts);
  } catch (error) {
    next(error);
    console.log(functions);
  }
};
module.exports = getFunc;
