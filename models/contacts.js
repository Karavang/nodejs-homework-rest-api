const { Contact } = require("../forDb");
const { default: mongoose } = require("mongoose");

const listContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const res = contacts.find((e) => e.id === contactId);
  // const res = await Contact.findById(contactId);
  return res;
};

const addContact = async (body) => {
  const contact = await Contact.create(body);
  return contact._doc;
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
  mongoose.isValidObjectId(id);
  const contact = await getContactById(id);

  const favor = contact.favorite;
  const favorite = body.favorite;
  if (favor !== favorite) {
    await Contact.findByIdAndUpdate(id, { favorite: favorite });
    const updatedContact = await getContactById(id);
    return updatedContact;
  }
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    throw new Error("Contact not found");
  }
  await Contact.findByIdAndRemove(contactId);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,

  changeContact,
  updateStatusContact,
};
