const functions = require("../../models/contacts");
const patchFunc = async (req, res, next) => {
  try {
    if (req.body.favorite === undefined) {
      return res.status(400).json({ message: "Missing field favorite" });
    }

    if (typeof req.body.favorite !== "boolean") {
      return res.status(400).json({ message: "Invalid type for favorite" });
    }

    const contact = await functions.getContactById(req.params.contactId);

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    const updatedContact = await functions.updateStatusContact(
      req.params.contactId,
      req.body
    );

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};
module.exports = patchFunc;
