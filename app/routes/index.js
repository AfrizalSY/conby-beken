const express = require('express')
const router = express.Router();
// const { ensureAuthenticated } = require('../config/auth')
const controller = require('../controller/public');

// router.get('/', (req,res) => 
//     // res.render('welcome')
// );

// router.get('/', controller.findTop4Consultants);

router.get('/', (req, res) => {
    res.json({
        message: 'success!'
    });
});

//Dashboard Page
// router.get('/dashboard',ensureAuthenticated, (req,res) => 
//     res.render('dashboard', {
//         name: req.user.name
//     })
// );

module.exports = router;