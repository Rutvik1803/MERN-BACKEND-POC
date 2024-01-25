const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json("You need to login");

  jwt.verify(token, "mernauth", (err, user) => {
    if (err) {
      return res.status(403).json("invalid token");
    }

    req.user = user;
    next();
  });
};

module.exports = verifyToken;
