const { Users } = require("../../forDb");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const reg = async (req, res) => {
  const contacts = await Users.find();
  const { body } = req;
  const ifAlso = contacts.find((e) => e.email === body.email);

  if (ifAlso === undefined) {
    const passwordHash = await bcrypt.hash(body.password, 10);
    const avatarURL = gravatar.url(body.email);
    const user = await Users.create({
      ...body,
      password: passwordHash,
      avatarURL,
    });

    res.status(201).json({
      user: {
        email: user.email,
        subscription: user.subscription,
        avatarURL,
      },
    });
  } else {
    res.status(409).json({ message: "Email in use" });
  }
};
module.exports = reg;
