const usersController = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.post("/register", usersController.create)
router.post("/login", usersController.login)


module.exports = router