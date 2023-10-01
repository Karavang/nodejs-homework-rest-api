const functions = require("../models/contacts");
const putFunc = async (req, res, next) => {
  try {
    const newCFromBase = await functions.changeContact(
      req.params.contactId,
      req.body
    );
    res.status(200).json(newCFromBase);
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: "Not found" });
  }
};
module.exports = putFunc;
