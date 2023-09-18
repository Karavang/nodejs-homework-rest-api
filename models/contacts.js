const fs = require("fs/promises");

const { Contact } = require("../forDb");
const filePath = "./models/contacts.json";

const listContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};
const updateContact = (list) =>
  fs.writeFile(filePath, JSON.stringify(list, null, 2));

const getContactById = async (contactId) => {
  const res = await Contact.findById(contactId);
  return res;
};

const addContact = async (body) => {
  const animal = {
    ...body,
  };
  const res = await Contact.create(animal);
  return res;
};

const changeContact = async (id, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((e) => e.id === id);

  if (index === -1) {
    throw new Error("Contact not found");
  }

  const updateFields = {};

  if (body.name !== undefined) {
    updateFields.name = body.name;
  }
  if (body.email !== undefined) {
    updateFields.email = body.email;
  }
  if (body.phone !== undefined) {
    updateFields.phone = body.phone;
  }
  if (body.favorite !== undefined) {
    updateFields.favorite = body.favorite;
  }
  console.log(updateFields);
  await Contact.findByIdAndUpdate(id, updateFields);
  console.log("Contact updated successfully");
};
const updateStatusContact = async (id, body) => {
  const contact = await getContactById(id);
  const favor = contact.favorite;
  const favorite = body.favorite;
  if (favor !== favorite || favorite !== undefined) {
    await Contact.findByIdAndUpdate(id, favorite);
  }
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    throw new Error("Contact not found");
  }
  await Contact.findByIdAndRemove(contactId);
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
  updateStatusContact,
};
