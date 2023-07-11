const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts");

const router = express.Router();

router.get("/", listContacts);

router.get("/:id", getContactById);

router.delete("/:id", removeContact);

router.post("/", addContact);

router.put("/:id", async (req, res, next) => {
  if (Object.keys(req.body).length !== 0) {
    updateContact(req, res, next);
  } else {
    res.status(400).json({ message: "missing fields" });
  }
});

router.patch("/:id/favorite", async (req, res, next) => {
  if (Object.keys(req.body).length !== 0) {
    updateStatusContact(req, res, next);
  } else {
    res.status(400).json({ message: "missing fields" });
  }
});

module.exports = router;
