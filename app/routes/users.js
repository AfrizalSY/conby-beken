const express = require('express')
const router = express.Router();
const controller = require('../controller/user');

//Login Page
router.get('/login', (req, res) => 
    res.render('login')
);

//Register Page
router.get('/register', (req, res) => 
    res.render('register')
);

//Forgot passowrd
router.get('/forgotpw', (req, res) => 
    res.render('forgotpw')
);

//Regis handle
router.post('/register', controller.register);

//Login Handle
router.post('/login', controller.login);

//Logout Handle
router.get('/logout', controller.logout);

module.exports = router;