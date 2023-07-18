const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

const authRouter = require("./auth");
const contactsRouter = require("./contacts");

router.use("/users", authRouter);
router.use("/contacts", auth, contactsRouter);

module.exports = router;
