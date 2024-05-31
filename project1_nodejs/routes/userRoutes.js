const express = require("express");
const { userRegister, userLogin, userCurrent } = require("../controllers/userController");
const validationToken = require("../middlewares/validateTokenHandler");

const router = express.Router();

router.post("/register", userRegister)

router.post("/login", userLogin)

router.get("/current",validationToken, userCurrent)

module.exports = router;