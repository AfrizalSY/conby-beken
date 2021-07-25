const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User.js');
const passport = require('passport');

//Login Page
router.get('/login', (req,res) => 
    res.render('login')
);

//Register Page
router.get('/register', (req,res) => 
    res.render('register')
);

//Forgot passowrd
router.get('/forgotpw', (req,res) => 
    res.render('forgotpw')
);

//Regis handle
router.post('/register',(req, res) => {
    const { name, email, password, password2 } = req.body;
    
    let errors = [];

    // Checking
    if ( !name || !email || !password || !password2 ) {
        errors.push( {msg: 'Please fill all the fields!'} )
    }
    if (password != password2) {
        errors.push( {msg: 'Password not match!'} )
    }
    if (password.length < 6) {
        errors.push( {msg: 'Password should be at least 6 characters!'} )
    }
    if (errors.length > 0) {
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        // Validation Passed
        User.findOne( {email: email } )
            .then(user => {
                if(user) {
                    errors.push({msg: 'Email is already used!'});
                    res.render('register',{
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });

                    // Hashing pw

                    bcrypt.genSalt(10, (err,salt) => 
                        bcrypt.hash(newUser.password, salt, (err,hash) => {
                            if(err) throw err;

                            // Password set as Hash
                            newUser.password = hash;
                            
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg','Registered! Now you can login.');
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log(err));
                        }))
                }
            });
    }
})

//Login Handle
router.post('/login', (req,res,next) => {
    passport.authenticate('local',{
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failireFlash: true
    })(req,res,next);
});

//Logout Handle
router.get('/logout', (req,res) => {
    req.logout();
    req.flash('success_msg','You are logout');
    res.redirect('/users/login');
});

module.exports = router;