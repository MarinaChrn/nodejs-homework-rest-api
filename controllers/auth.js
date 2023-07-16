const User = require("../models/user");
const bcrypt = require("bcrypt");
const userSchema = require("../schemas/user");

const registered = async (req, res, next) => {
  try {
    const { password, email } = req.body;

    const response = userSchema.validate(req.body, { convert: false });

    if (typeof response.error !== "undefined") {
      return res.status(400).json({ message: response.error.message });
    }

    const user = await User.findOne({ email });

    if (user !== null) {
      return res.status(409).json({ message: "Email in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await User.create({ email, password: passwordHash });

    return res.status(201).json({ user: { email, subscription: "starter" } });
  } catch (error) {
    return next(error);
  }
};

module.exports = { registered };
