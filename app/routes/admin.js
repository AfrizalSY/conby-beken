const controller = require('../controller/admin');
const router = require('express').Router();

router.post('/register', controller.register);

router.post('/login', controller.login);

router.post('/create-consultant', controller.createConsultantAccount);

module.exports = router;