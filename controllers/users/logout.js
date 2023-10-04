const logout = async (req, res) => {
  try {
    console.log(req.body);
    res.json({ email: req.body.email, subscription: req.body.subscription });
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};
module.exports = logout;
