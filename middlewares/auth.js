const jwt = require("jsonwebtoken");
const { JWTSECRET } = process.env;
const { Users } = require("../forDb");

const auth = async (req, res, next) => {
  const authParts = req.headers.authorization.split(" ");
  const bearer = authParts[0];
  const token = authParts[1];

  if (bearer === "Bearer") {
    try {
      const { id } = jwt.verify(token, JWTSECRET);

      const user = await Users.findById(id);
      if (!user || user.token !== token) {
        res.status(401).json({ message: "Not authorized" });
        return;
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized" });
    }
  } else {
    res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = auth;
