const bcrypt = require('bcryptjs');
const User = require('../models/User.js');
const passport = require('passport');

exports.register = (req, res) => {
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
};

exports.login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failireFlash: true
    })(req, res, next);
};

exports.logout = (req, res) => {
    req.logout();
    req.flash('success_msg','You are logout');
    res.redirect('/users/login');
};

exports.updateBaby = (req, res) => {
    const dataBaby = { baby: req.body };

    User.findByIdAndUpdate(req.params.id, dataBaby).then(() => {
        return res.status(200).json({
            message: 'success! you have updated baby data'
        });
    }).catch((err) => {
        console.log('>> error: ', err);
        return res.status(500).json({
            error: err.message
        });
    });
};