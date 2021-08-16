const router = require('express').Router();
const controller = require('../controller/order');
const auth = require('../middlewares/auth');

router.post(
    '/:id', // id consultant
    [
        auth.verifyToken,
        auth.isUser
    ],
    controller.createOrder
);

router.get(
    '/checkout/:id', // id order
    [
        auth.verifyToken,
        auth.isUser
    ],
    controller.checkout
);

module.exports = router;