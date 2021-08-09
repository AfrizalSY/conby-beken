const controller = require('../controller/admin');
const router = require('express').Router();

router.post('/create-consultant', controller.createConsultantAccount);

module.exports = router;