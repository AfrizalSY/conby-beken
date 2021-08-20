const controller = require('../controller/consultant');
const router = require('express').Router();
const uploadPhoto = require('../middlewares/photo');
const auth = require('../middlewares/auth');

router.post('/login', controller.login);

router.put(
    '/update-profile/:id',
    uploadPhoto.single('photo'),
    [
        auth.verifyToken,
        auth.compareId,
    ],
    controller.updateProfile
);

module.exports = router;