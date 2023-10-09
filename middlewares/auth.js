const jwt = require("jsonwebtoken");
const { JWTSECRET } = process.env;
const { Users } = require("../forDb");

const auth = async (req, res, next) => {
  try {
    if (req.headers.authorization !== undefined) {
      const { authorization = "" } = req.headers;
      const [bearer, token] = authorization.split(" ");
      console.log(bearer);
      console.log(token);
      if (bearer === "Bearer") {
        const { id } = jwt.verify(token, JWTSECRET);

        const user = await Users.findById(id);
        if (!user || user.token !== token) {
          res.status(401).json({ message: "Not authorized" });
          return;
        }

        req.user = user;
        next();
      }
    } else {
      res.status(401).json({ message: "Not authorized" });
    }
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = auth;
