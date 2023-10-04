const { Users } = require("../../forDb");

const reg = async (req, res, next) => {
  const contacts = await Users.find();
  const { body } = req;
  const ifAlso = contacts.find((e) => e.email === body.email);

  if (ifAlso === undefined) {
    const user = await Users.create(body);
    res.json(user);
  } else {
    res.status(409).json({ message: "Email in use" });
  }
};
module.exports = reg;
