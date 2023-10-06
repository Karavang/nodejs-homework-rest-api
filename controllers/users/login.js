const jwt = require("jsonwebtoken");
const { Users } = require("../../forDb");
const bcrypt = require("bcrypt");
const { JWTSECRET } = process.env;
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user] = await Users.find({ email }).where("deletedAt").equals(null);
    if (!user) {
      throw new Error();
    }

    const { password: hashedPassword } = user;
    const checkPass = await bcrypt.compare(password, hashedPassword);

    if (!checkPass) {
      throw new Error();
    }
    user.token = jwt.sign(
      { id: user._id, email: user.email, subscription: user.subscription },
      JWTSECRET,
      {
        expiresIn: 3600,
      }
    );
    await user.save();

    res.status(200).json({
      token: user.token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    res.status(401).json({ message: "Email or password is wrong" });
  }
};
module.exports = login;
