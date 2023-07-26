const User = require("../models/user");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
require("dotenv").config();
const { userSchema, subscriptionSchema } = require("../schemas/user");
const jwt = require("jsonwebtoken");
const Jimp = require("jimp");
const path = require("path");
const fs = require("fs/promises");

const avatarPath = path.resolve("public", "avatars");
const JWT_SECRET = process.env.JWT_SECRET;

const registered = async (req, res, next) => {
  try {
    const { password, email } = req.body;

    const response = userSchema.validate(req.body, { convert: false });

    if (typeof response.error !== "undefined") {
      return res.status(400).json({ message: response.error.message });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({ message: "Email in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const imgUrl = `${gravatar.url(
      email
    )}?d=https://i0.wp.com/png.pngitem.com/pimgs/s/80-800555_user-png-transparent-png.png?ssl=1&w=80`;

    await User.create({ email, password: passwordHash, avatarURL: imgUrl });

    return res.status(201).json({ user: { email, subscription: "starter" } });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { password, email } = req.body;

    const response = userSchema.validate(req.body, { convert: false });

    if (typeof response.error !== "undefined") {
      return res.status(400).json({ message: response.error.message });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch === false) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "23h" });

    await User.updateOne({ _id: user._id }, { $set: { token } });

    return res
      .status(200)
      .json({ token, user: { email, subscription: "starter" } });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await User.updateOne({ _id: req.user.id }, { $set: { token: null } });
    return res.status(204).json({ message: "Logout success" });
  } catch (error) {
    next(error);
  }
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const updateSubscription = async (req, res, next) => {
  const { id } = req.user;

  try {
    const { error } = subscriptionSchema.validate(req.body, { convert: false });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const result = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      return res.status(404).send("User not found");
    }

    return res.send({
      email: req.user.email,
      subscription: result.subscription,
    });
  } catch (error) {
    return next(error);
  }
};

const updateAvatar = async (req, res, next) => {
  console.log(req.user.id);
  if (!req.file) {
    res.status(400).json({ message: "Avatar must be provided!" });
  }

  const { id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  await Jimp.read(tempUpload)
    .then((avatar) => {
      return avatar.resize(250, 250).write(tempUpload);
    })
    .catch((error) => {
      next(error);
    });

  const fileName = `${id}${originalname}`;

  const publicUpload = path.join(avatarPath, fileName);

  await fs.rename(tempUpload, publicUpload);

  console.log(fileName);
  const avatarURL = path.join("avatars", fileName);

  await User.findByIdAndUpdate(id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = {
  registered,
  login,
  logout,
  getCurrent,
  updateSubscription,
  updateAvatar,
};
