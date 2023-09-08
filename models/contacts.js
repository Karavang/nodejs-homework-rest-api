const fs = require("fs/promises");
const filePath = "./models/contacts.json";
const listContacts = async () => {
  // Это для get / ,возвращает массив всех контактов в json-формате со статусом 200
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  console.log(contactId);
  const list = await listContacts();
  const res = list.find((e) => e.id === contactId);

  return res;
};

const addContact = async (body) => {};

const removeContact = async (contactId) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
