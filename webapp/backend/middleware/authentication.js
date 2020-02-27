const jwt = require("jsonwebtoken");

authentication = (req, res, next) => {
  const token = req.header("auth_token");
  if (!token) return res.status(401).send("Assess denied. No token provided.");

  try {
    const decoded = jwt.verify(token, "process.env.JWT_PRIVATE_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = { authentication };
