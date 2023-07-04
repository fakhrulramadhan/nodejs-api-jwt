//pangggil file user controller.js
const userController = require('../controllers/users.controller');

const express = require('express');
const router = express.Router();

//atur routing URlnya disini
//url /register mengarah ke usercontroller.register
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/user-profile", userController.userProfile);

//lempar nilai routernya pakai modul.exports
module.exports = router;