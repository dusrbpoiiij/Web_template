const express = require('express');
const router = express.Router();

// Validation 
const {
  validRegister,
  validLogin,
} = require('../helpers/authValid');

// Load Controllers
const {
  registerController,
  loginController
} = require('../controllers/auth.controller.js');

router.post('/register', validRegister ,registerController);
router.post('/login', validLogin, loginController);


module.exports = router;