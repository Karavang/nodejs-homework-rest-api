const { Router } = require("express");
const login = require("../../controllers/users/login");
const router = new Router();
const reg = require("../../controllers/users/reg");

router.post("/users/register", async (req, res, next) => {
  const { body } = req;
  try {
    const register = await reg();
  } catch (error) {}
});
router.post("/users/login", async (req, res, next) => {
  const { body } = req;
  try {
    const log = await login();
  } catch (error) {}
});
module.exports = router;
