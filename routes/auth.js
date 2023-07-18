const express = require("express");
const {
  registered,
  login,
  logout,
  getCurrent,
  updateSubscription,
} = require("../controllers/auth");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/register", registered);
router.post("/login", login);
router.post("/logout", auth, logout);
router.get("/current", auth, getCurrent);
router.patch("/", auth, updateSubscription);

module.exports = router;
