const Contact = require("../models/contact");

const validationError = (res, error) => {
  let messages = "";
  for (const element in error.errors) {
    messages += `${error.errors[element].message}\n`;
  }
  res.status(400).send(messages);
};

const listContacts = async (__, res, next) => {
  try {
    const contacts = await Contact.find();
    return res.status(200).send(contacts);
  } catch (error) {
    return next(error);
  }
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findById(id);

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
    const result = await Contact.findByIdAndRemove(id);

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

    const result = await Contact.create(contact);
    return res.status(201).send(result);
  } catch (error) {
    if (error.message.includes("validation")) {
      validationError(res, error);
    } else return next(error);
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
    const result = await Contact.findByIdAndUpdate(id, contact, { new: true });

    if (!result) {
      return res.status(404).send("Contact not found");
    }

    return res.send(result);
  } catch (error) {
    if (error.message.includes("validation")) {
      validationError(res, error);
    } else return next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const result = await Contact.findByIdAndUpdate(id, body, { new: true });

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
