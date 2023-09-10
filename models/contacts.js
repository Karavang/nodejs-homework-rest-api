const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const filePath = "./models/contacts.json";

const listContacts = async () => {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
};
const updateContact = (list) =>
  fs.writeFile(filePath, JSON.stringify(list, null, 2));
const getContactById = async (contactId) => {
  console.log(contactId);
  const list = await listContacts();
  const res = list.find((e) => e.id === contactId);

  return res;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const animal = {
    id: nanoid(),
    ...body,
  };
  contacts.push(animal);
  console.log(contacts);
  await updateContact(contacts);
};
const changeContact = async (id, body) => {
  console.log(body);
  console.log(id);
  const contacts = await listContacts();
  const index = contacts.findIndex((e) => e.id === id);
  contacts[index] = body;
  console.log(contacts);
  await updateContact(contacts);
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    throw new Error("Contact not found");
  }
  contacts.splice(index, 1);
  console.log(contacts);
  await updateContact(contacts);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  changeContact,
};
