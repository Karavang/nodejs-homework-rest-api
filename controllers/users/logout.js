const { Users } = require("../../forDb");

const logout = async (req, res) => {
  try {
    const token = req.user.token;

    if (token !== undefined) {
      const user = await Users.findById(req.user.id);
      console.log(user.id);
      user.token = null;
      await user.save();
    }

    res.status(204).end();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};
module.exports = logout;
