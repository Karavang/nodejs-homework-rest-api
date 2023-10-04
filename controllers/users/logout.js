const logout = async (req, res) => {
  try {
    const authorizationParts = req.headers.authorization.split(" ");
    const token = authorizationParts[1];

    if (token !== undefined) {
      delete req.headers.authorization;
    }
    console.log(req.headers.authorization);
    res.status(204).end();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};
module.exports = logout;
