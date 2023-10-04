const jwt = require("jsonwebtoken");
const { Users } = require("../forDb");
const auth = async (req, res, next) => {
  const headers = req.headers;
  if (headers.authorization && headers.authorization.includes("Bearer")) {
    const authorizationParts = headers.authorization.split(" ");

    const undecoded = jwt.decode(authorizationParts[1]);

    const contacts = await Users.find();

    const undecodedUser = contacts.find((e) => e.id === undecoded.id);

    // res.body = undecodedUser;

    next();
  } else {
    res.status(401).json({ message: "Not authorized" });
  }
};
module.exports = auth;
