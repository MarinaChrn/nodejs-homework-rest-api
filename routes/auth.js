const express = require("express");
const { registered } = require("../controllers/auth");
const router = express.Router();

router.post("/register", registered);

module.exports = router;
