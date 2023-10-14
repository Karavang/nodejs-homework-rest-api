const path = require("path");
const { Users } = require("../../forDb");
const fs = require("fs/promises");
const Jimp = require("jimp");
const updateAvatar = async (req, res) => {
  const id = req.user._id;
  if (!req.file) {
    res.status(400).json({ message: "Image is not found" });
    return;
  }
  const { path: tmpPath, originalname } = req.file;
  try {
    const newName = `${id}-${originalname}`;
    const endPath = path.join(__dirname, "../../public/", "avatars", newName);
    const startResize = await Jimp.read(tmpPath);
    await startResize.resize(250, 250).write(tmpPath);
    try {
      await fs.rename(tmpPath, endPath);
    } catch (error) {
      await fs.unlink(tmpPath);
    }
    const avatarURL = path.join("avatars", newName);
    await Users.findByIdAndUpdate(id, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    console.log(error);

    res.status(401).json(error);
  }
};
module.exports = updateAvatar;
