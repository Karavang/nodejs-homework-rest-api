const fs = require("fs/promises");
const filePath = "./contacts.json";
const listContacts = async () => {
  // Это для get / ,возвращает массив всех контактов в json-формате со статусом 200
  const data = await fs.readFile(filePath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {};

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
