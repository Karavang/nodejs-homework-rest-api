const logout = async (req, res) => {
  try {
    const token = req.user.token;

    if (token !== undefined) {
      delete req.user.token;
    }

    res.status(204).end();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};
module.exports = logout;
