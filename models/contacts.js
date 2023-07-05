const fs = require("node:fs/promises");
const crypto = require("crypto");
const path = require("node:path");
const contactSchema = require("../schemas/contact");

const contactsPath = path.join(__dirname, "contacts.json");

const readContacts = (next)=> {
  return fs.readFile(contactsPath, "utf8")
  .then((data) => JSON.parse(data))
  .catch((error)=> next(error)
  );
}

const  writeContacts =async(contacts)=> {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

const listContacts = async (__, res, next) => {
  const contacts = await readContacts(next);
  res.status(200).send(contacts)
}

const getContactById = async (req, res, next, id) => {
  const contacts = await readContacts(next)
  const contact = contacts.find((contact)=>contact.id===id);
  contact ? res.status(200).send(contact) : res.status(404).json({"message": "Not found"})
}

const removeContact = async (req, res, next, id) => {
  const contacts = await readContacts(next)
  const newContacts = contacts.filter((contact)=>contact.id!==id);
  newContacts!==contacts ? (writeContacts(newContacts)&&res.status(200).send({"message": "Contact deleted"})) : res.status(404).json({"message": "Not found"})
}

const addContact = async (req,res, next) => {
  const contacts = await readContacts(next)
  const response = contactSchema.validate(req.body, { convert: false });
  
  if (typeof response.error !== "undefined") {
    return res.status(400).json({"message":response.error.message});
  }

  writeContacts(contacts.push({
    id: crypto.randomUUID(),
    name: response.value.name,
    email: response.value.email,
    phone: response.value.phone,
  }))

  return res.status(201).json({
    id: crypto.randomUUID(),
    name: response.value.name,
    email: response.value.email,
    phone: response.value.phone,
  });
}

const updateContact = async (req, res, next, id) => {
  const contacts = await readContacts(next);
  const contact = req.body;
  const response = contactSchema.validate(req.body, { convert: false });
  if (typeof response.error !== "undefined") {
    return res.status(400).json({"message":response.error.message});
  }
  const index = contacts.findIndex(el => el.id === id);
  if (index!==-1) {
    contacts[index] = {id, ...contact};
    writeContacts(contacts);
    res.status(200).json({id, ...contact})
  } else {
    res.status(404).json({"message": "Not found"})
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
