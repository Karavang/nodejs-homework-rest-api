const current = async (req, res) => {
  try {
    res.json({ email: req.body.email, subscription: req.body.subscription });
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};
module.exports = current;
