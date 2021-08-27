const controller = require('../controller/consultant');
const router = require('express').Router();
const uploadPhoto = require('../middlewares/photo');
const auth = require('../middlewares/auth');

router.post('/login', controller.login);

router.put(
    '/update-profile/:id', // id consultant
    uploadPhoto.single('photo'),
    [
        auth.verifyToken,
        auth.compareId,
    ],
    controller.updateProfile
);

router.get(
    '/profile/:id', // id consultant
    [
        auth.verifyToken,
        auth.compareId
    ],
    controller.findOneConsultant
);

router.get(
    '/order-history/:id',
    [
        auth.verifyToken,
        auth.compareId
    ],
    controller.findConsultantOrder
);

module.exports = router;