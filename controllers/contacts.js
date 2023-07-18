const Contact = require("../models/contact");
const contactSchema = require("../schemas/contact");

const listContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;
    const contacts = await Contact.find(
      favorite ? { favorite, ownerId: req.user.id } : { ownerId: req.user.id }
    )
      .skip(skip)
      .limit(limit);
    return res.status(200).send(contacts);
  } catch (error) {
    return next(error);
  }
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findOne({ _id: id, ownerId: req.user.id });

    if (contact === null) {
      return res.status(404).send("Contact not found");
    }

    return res.send(contact);
  } catch (error) {
    return next(error);
  }
};

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Contact.findOneAndRemove({
      _id: id,
      ownerId: req.user.id,
    });

    if (result === null) {
      return res.status(404).send("Contact not found");
    }

    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const contact = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      favorite: req.body.favorite,
    };

    const response = contactSchema.validate(req.body, { convert: false });

    if (typeof response.error !== "undefined") {
      return res.status(400).json({ message: response.error.message });
    }

    const result = await Contact.create({ ...contact, ownerId: req.user.id });
    return res.status(201).send(result);
  } catch (error) {
    return next(error);
  }
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;

  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  };

  try {
    const response = contactSchema.validate(req.body, { convert: false });

    if (typeof response.error !== "undefined") {
      return res.status(400).json({ message: response.error.message });
    }

    const result = await Contact.findOneAndUpdate(
      { _id: id, ownerId: req.user.id },
      contact,
      { new: true }
    );

    if (!result) {
      return res.status(404).send("Contact not found");
    }

    return res.send(result);
  } catch (error) {
    return next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const result = await Contact.findOneAndUpdate(
      { _id: id, ownerId: req.user.id },
      body,
      { new: true }
    );

    if (!result) {
      return res.status(404).send("Contact not found");
    }

    return res.send(result);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
