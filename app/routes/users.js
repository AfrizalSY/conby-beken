const express = require('express')
const router = express.Router();
const controller = require('../controller/user');
const uploadPhoto = require('../middlewares/photo');
const auth = require('../middlewares/auth');

//Login Page
// router.get('/login', (req, res) => 
//     res.render('login')
// );

//Register Page
// router.get('/register', (req, res) => 
//     res.render('register')
// );

//Forgot passowrd
// router.get('/forgotpw', (req, res) => 
//     res.render('forgotpw')
// );

//Regis handle
router.post('/register', controller.register);

//Login Handle
router.post('/login', controller.login);

//Logout Handle
router.get('/logout', controller.logout);

// update profile
router.put(
    '/update-profile/:id',
    uploadPhoto.single('photo'),
    [
        auth.verifyToken,
        auth.compareId
    ],
    controller.updateProfile
);

// get one user
router.get(
    '/profile/:id', // id user
    [
        auth.verifyToken,
        auth.compareId
    ],
    controller.findOneUser
);

// get order history of one user
router.get(
    '/order-history/:id', // id user
    [
        auth.verifyToken,
        auth.compareId
    ],
    controller.findOrderUser
);

module.exports = router;