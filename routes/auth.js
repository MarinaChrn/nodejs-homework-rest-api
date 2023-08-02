const express = require("express");
const {
  registered,
  login,
  logout,
  getCurrent,
  updateSubscription,
  updateAvatar,
  verify,
  newVerify,
} = require("../controllers/auth");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const router = express.Router();

router.post("/register", registered);
router.post("/login", login);
router.post("/logout", auth, logout);
router.get("/current", auth, getCurrent);
router.patch("/", auth, updateSubscription);
router.patch("/avatars", auth, upload.single("avatar"), updateAvatar);
router.get("/verify/:verificationToken", verify);
router.post("/verify", newVerify);

module.exports = router;
