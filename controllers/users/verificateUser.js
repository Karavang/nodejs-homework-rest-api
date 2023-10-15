const { Users } = require("../../forDb");

const verificateUser = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await Users.findOne({ verificationToken });
  console.log(user);
  if (user) {
    await Users.findByIdAndUpdate(user._id, {
      verificationToken: null,
      verify: true,
    });
    res.status(200).json({ message: "Verification successful" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
module.exports = verificateUser;
