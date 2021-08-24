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

// get one user
router.post(
    '/verify/:id',
    controller.verifyUser
);

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
    '/profile/:id',
    [
        auth.verifyToken,
        auth.compareId
    ],
    controller.findOneUser
);

router.get(
    '/consultation-schedule',
    [
        auth.verifyToken,
        auth.isUser
    ],
    controller.findOrderUser
);

module.exports = router;