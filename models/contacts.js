const fs = require("fs/promises");
const filePath = "./models/contacts.json";
const listContacts = async () => {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
};
const updateContacts = (list) =>
  fs.writeFile(filePath, JSON.stringify(list, null, 2));
const getContactById = async (contactId) => {
  console.log(contactId);
  const list = await listContacts();
  const res = list.find((e) => e.id === contactId);

  return res;
};

const addContact = async (body) => {};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    throw new Error("Contact not found");
  }
  contacts.splice(index, 1);
  console.log(contacts);
  await updateContacts(contacts);
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
