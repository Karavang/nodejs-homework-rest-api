const { Users } = require("../../forDb");
const bcrypt = require("bcrypt");

const reg = async (req, res) => {
  const contacts = await Users.find();
  const { body } = req;
  const ifAlso = contacts.find((e) => e.email === body.email);

  if (ifAlso === undefined) {
    const passwordHash = await bcrypt.hash(body.password, 10);
    const user = await Users.create({ ...body, password: passwordHash });
    res.status(201).json({ message: user });
  } else {
    res.status(409).json({ message: "Email in use" });
  }
};
module.exports = reg;
