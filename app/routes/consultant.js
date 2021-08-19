const controller = require('../controller/consultant');
const router = require('express').Router();
const uploadPhoto = require('../middlewares/photo');
const auth = require('../middlewares/auth');

router.post('/login', controller.login);

router.put(
    '/update-profile/:id',
    [
        auth.verifyToken,
        auth.compareId,
    ],
    uploadPhoto.single('photo'),
    controller.updateProfile
);

module.exports = router;