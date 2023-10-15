const { Users } = require("../../forDb");
const bcrypt = require("bcrypt");
const sendEmail = require("../../utils/sendMail");
const { v4: uuidv4 } = require("uuid");
const gravatar = require("gravatar");
const { BASEURL } = process.env;
const reg = async (req, res) => {
  const contacts = await Users.find();
  const { body } = req;
  const ifAlso = contacts.find((e) => e.email === body.email);

  if (ifAlso === undefined) {
    const passwordHash = await bcrypt.hash(body.password, 10);
    const avatarURL = gravatar.url(body.email);
    const verificationToken = uuidv4();
    const user = await Users.create({
      ...body,
      password: passwordHash,
      avatarURL,
      verificationToken,
    });
    const verifyEmail = {
      to: body.email,
      subject: "verificate email",
      html: ` <a href="${BASEURL}/users/verify/${verificationToken}">
       Click to verify email
     </a>`,
    };
    await sendEmail(verifyEmail);
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
