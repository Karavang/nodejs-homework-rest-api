const path = require("path");
const multer = require("multer");
const tmpPath = path.join(__dirname, "../tmp/");
const multerConfig = multer.diskStorage({
  destination: tmpPath,
});
const upload = multer({ storage: multerConfig });
module.exports = upload;
