const bcrypt = require('bcryptjs');
const User = require('../models/user.js');
// const passport = require('passport');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
    const { email, password, password2 } = req.body;
    
    let errors = [];

    // Checking
    if ( !email || !password || !password2 ) {
        errors.push({ msg: 'Please fill all the fields!' });
    }
    if (password != password2) {
        errors.push({ msg: 'Password not match!' });
    }
    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters!' });
    }
    if (errors.length > 0) {
        // res.render('register',{
        //     errors,
        //     email,
        //     password,
        //     password2
        // });
        return res.status(400).json({
            status: 400,
            errors: errors
        });
    } else {
        // Validation Passed
        User.findOne({ email: email })
            .then(user => {
                if(user) {
                    errors.push( {msg: 'Email is already used!'} );
                    // res.render('register',{
                    //     errors,
                    //     email,
                    //     password,
                    //     password2
                    // });
                    res.status(400).json({
                        status: 400,
                        errors: errors
                    });
                } else {
                    const newUser = new User({
                        email,
                        password
                    });

                    // Hashing pw
                    bcrypt.genSalt(10, (err, salt) => 
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;

                            // Password set as Hash
                            newUser.password = hash;
                            
                            newUser.save()
                                .then(() => {
                                    req.flash('success_msg','Registered! Now you can login.');
                                    // res.redirect('/users/login');
                                    res.status(201).json({
                                        status: 201,
                                        message: 'success! you have registered'
                                    });
                                })
                                .catch(err => console.log(err));
                        }))
                }
            });
    }
};

// exports.login = (req, res, next) => {
//     passport.authenticate('local', {
//         successRedirect: '/dashboard',
//         failureRedirect: '/users/login',
//         failireFlash: true
//     })(req, res, next);
// };

exports.login = (req, res) => {
    User.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
            return res.status(401).json({
                status: 401,
                message: `email or password doesn't match!`
            });
        }

        // validate password
        var password = bcrypt.compareSync(req.body.password, user.password);
        if (!password) {
            return res.status(401).json({
                status: 401,
                message: `email or password doesn't match!`
            });
        }

        // create token
        var token = jwt.sign({ _id: user._id }, process.env.SECRET, {
            expiresIn: 1800 // 30 minutes
        });

        res.status(200).json({
            status: 200,
            message: 'success! you have logged in',
            data: {
                id: user._id,
                accessToken: token
            }
        });
    }).catch((err) => console.log(err));
};

exports.logout = (req, res) => {
    req.logout();
    req.flash('success_msg','You are logout');
    res.redirect('/users/login');
};

exports.updateProfile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            status: 400,
            message: 'photo must be attached!'
        });
    }

    const dataUser = {
        name: req.body.userName,
        photo: req.file.path,
        baby: {
            name: req.body.babyName,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            height: req.body.height,
            weight: req.body.weight
        }
    };

    User.findByIdAndUpdate(req.params.id, dataUser).then(() => {
        res.status(200).json({
            status: 200,
            message: 'success! your profile has been updated'
        });
    }).catch((err) => console.log(err));
};