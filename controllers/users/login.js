const { Users } = require("../../forDb");
const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Users.find({ email }).where("deletedAt").equals(null);
    if (!user[0]) {
      throw new Error();
    }
    console.log(user[0]);
    const { password: hashedPassword } = user[0];
    const checkPass = await bcrypt.compare(password, hashedPassword);

    if (!checkPass) {
      throw new Error();
    }
    const userMy = user[0];
    res.status(200).json({
      token: userMy.token,
      user: { email: userMy.email, password: userMy.password },
    });
  } catch (error) {
    res.status(401).json({ message: "Email or password is wrong" });
  }
};
module.exports = login;
