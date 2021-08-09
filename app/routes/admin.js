const controller = require('../controller/admin');
const router = require('express').Router();
const auth = require('../middlewares/auth');

router.post(
    '/register',
    [
        auth.verifyToken,
        auth.isAdmin
    ],
    controller.register
);

router.post('/login', controller.login);

router.post(
    '/create-consultant',
    [
        auth.verifyToken,
        auth.isAdmin
    ],
    controller.createConsultantAccount
);

module.exports = router;