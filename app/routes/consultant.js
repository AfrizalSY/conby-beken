const controller = require('../controller/consultant');
const router = require('express').Router();
const uploadPhoto = require('../middlewares/photo');

router.post('/login', controller.login);

router.put('/update-profile/:id', uploadPhoto.single('photo'), controller.updateProfile);

module.exports = router;