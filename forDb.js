const { Schema, model, connect } = require("mongoose");
const fromEnv = process.env;
const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);
const Contact = model("contact", schema);

const mongoConnect = async () => {
  try {
    await connect(fromEnv.LINK);
  } catch (error) {
    console.log(`We has any problems with connection to db. Error:${error}`);
  }
};

module.exports = { Contact, mongoConnect };
