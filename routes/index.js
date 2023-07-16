const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const contactsRouter = require("./contacts");

router.use("/auth", authRouter);
router.use("/contacts", contactsRouter);

module.exports = router;
