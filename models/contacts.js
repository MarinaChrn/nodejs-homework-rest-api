const fs = require("node:fs/promises");
const path = require("node:path")

const contactsPath = path.join(__dirname, "contacts.json");

const readContacts = async(__,res)=> {
  return fs.readFile(contactsPath, "utf8")
}

const  writeContacts =async(contacts)=> {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

const listContacts = async (__, res) => {
  await readContacts()
  .then((data) => {
    res.status(200).send(JSON.parse(data))
  })
  .catch((err) => res.status(500).send(err));
}

const getContactById = async (req, res, id) => {
  const contacts = await readContacts()
      .then((data) => JSON.parse(data))
      .catch((err) => res.status(500).send(err));
  const contact = contacts.find((contact)=>contact.id===id);
  contact ? res.status(200).send(contact) : res.status(404).json({"message": "Not found"})
}

const removeContact = async (req, res, id) => {
  const contacts = await readContacts()
      .then((data) => JSON.parse(data))
      .catch((err) => res.status(500).send(err));
  const newContacts = contacts.filter((contact)=>contact.id!==id);
  console.log(newContacts)
  newContacts!==contacts ? (writeContacts(newContacts)&&res.status(200).send({"message": "Contact deleted"})) : res.status(404).json({"message": "Not found"})
}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
