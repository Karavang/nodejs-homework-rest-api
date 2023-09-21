const { default: mongoose } = require("mongoose");

const isValideId = async (id) => {
  const isVal = mongoose.isValidObjectId(id);
  console.log(isVal);
};
module.exports = isValideId;
