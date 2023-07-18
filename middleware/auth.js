const jwt = require("jsonwebtoken");

const User = require("../models/user");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (typeof authHeader !== "string") {
    return res.status(401).json({ error: "Not authorized" });
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer") {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      return res.status(401).json({ error: "Not authorized" });
    }
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ error: "Not authorized" });
  }
};

module.exports = auth;
