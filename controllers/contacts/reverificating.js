const sendEmail = require("../../utils/sendMail");
const { BASEURL } = process.env;
const { Users } = require("../../forDb");
const reverificating = async (req, res) => {
  const { email } = req.body;
  const user = await Users.findOne({ email });
  if (user.verify) {
    res.status(400).json({ message: "Verification has already been passed" });
  } else {
    const verifyEmail = {
      to: email,
      subject: "verificate email",
      html: ` <a href="${BASEURL}/users/verify/${user.verificationToken}">
     Click to verify email
   </a>`,
    };
    sendEmail(verifyEmail);
    res.status(200).json({ message: "Verification email sent" });
  }
};
module.exports = reverificating;
