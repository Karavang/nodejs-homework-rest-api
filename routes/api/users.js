const { Router } = require("express");
const login = require("../../controllers/users/login");
const router = new Router();
const reg = require("../../controllers/users/reg");
const validateBody = require("../../validation.js");

const auth = require("../../middlewares/auth");
const current = require("../../controllers/users/current");
const logout = require("../../controllers/users/logout");
const upload = require("../../middlewares/upload");
const updateAvatar = require("../../controllers/users/updateAvatars");
const verificateUser = require("../../controllers/users/verificateUser");
const reverificating = require("../../controllers/contacts/reverificating");
const standartBody = require("../../validateSchemes/standartBody");
const emailValidate = require("../../validateSchemes/email");

router.get("/current", auth, current);
router.get("/verify/:verificationToken", verificateUser);
router.post("/register", validateBody(standartBody), reg);
router.post("/login", validateBody(standartBody), login);
router.post("/verify", validateBody(emailValidate), reverificating);
router.post("/logout", auth, logout);
router.patch("/avatars", auth, upload.single("avatar"), updateAvatar);
module.exports = router;
