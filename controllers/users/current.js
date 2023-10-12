const current = async (req, res) => {
  try {
    res.json({ email: req.user.email, subscription: req.user.subscription });
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};
module.exports = current;
