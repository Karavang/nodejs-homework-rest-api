const { Users } = require("../../forDb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWTSECRET } = process.env;
const reg = async (req, res) => {
  const contacts = await Users.find();
  const { body } = req;
  const ifAlso = contacts.find((e) => e.email === body.email);

  if (ifAlso === undefined) {
    const passwordHash = await bcrypt.hash(body.password, 10);
    const user = await Users.create({ ...body, password: passwordHash });
    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, JWTSECRET, { expiresIn: "23h" });
    user.token = token;
    await user.save();

    res
      .status(201)
      .json({ user: { email: user.email, subscription: user.subscription } });
  } else {
    res.status(409).json({ message: "Email in use" });
  }
};
module.exports = reg;
