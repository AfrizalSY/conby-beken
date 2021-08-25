const express = require('express')
const router = express.Router();
// const { ensureAuthenticated } = require('../config/auth')
const controller = require('../controller/public');

// router.get('/', (req,res) => 
//     res.render(
//         'CONBY Base API')
// );

router.get('/', controller.findTop4Consultants);

router.get('/consultants', controller.findAllConsultants);

router.get('/:id', controller.findOneConsultant);

//Dashboard Page
// router.get('/dashboard',ensureAuthenticated, (req,res) => 
//     res.render('dashboard', {
//         name: req.user.name
//     })
// );

module.exports = router;