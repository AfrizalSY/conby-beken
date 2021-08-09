const controller = require('../controller/consultant');
const router = require('express').Router();

router.post('/login', controller.login);

module.exports = router;