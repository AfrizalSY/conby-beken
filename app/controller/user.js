const bcrypt = require('bcryptjs');
const User = require('../models/user.js');
// const passport = require('passport');
const jwt = require('jsonwebtoken');
const rn = require('random-number');
const nodemailer = require('nodemailer');

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
                    // Code Verication range 1000-9999
                    const code = {
                        min:  1000,
                        max:  9999,
                        integer: true
                      }
                    codeVerif = rn(code)
                    const newUser = new User({
                        email,
                        password,
                        codeVerif,
                        isVerif : false
                    });

                    // Hashing pw
                    bcrypt.genSalt(10, (err, salt) => 
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;

                            // Password set as Hash
                            newUser.password = hash;
                            newUser.save()
                            .then((savedUser) => {
                                // create token
                                // var token = jwt.sign({ _id: savedUser._id }, process.env.SECRET, {
                                //     expiresIn: 86400 // 1 day
                                // });

                                req.flash('success_msg','Registered! Now you can login and check the email for the Code Confirmation');
                                // res.redirect('/users/login');
                                // res.redirect('verify/'+ newUser._id)
                                res.status(201).json({
                                    status: 201,
                                    message: 'success! you have registered',
                                    data: {
                                        user: {
                                            order: newUser.order,
                                            id: newUser._id,
                                            email: newUser.email,
                                            password: newUser.password,
                                            isVerif: newUser.isVerif,
                                            createdAt: newUser.createdAt,
                                            updatedAt: newUser.updatedAt,
                                        }
                                        // accessToken: token
                                    }
                                });
                                
                            })
                            .catch(err => console.log(err));

                            const transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: process.env.EMAIL_CONBY,
                                    pass: process.env.PW_CONBY
                                }
                            });
                            
                            const mailVerif = {
                                from: process.env.EMAIL_CONBY,
                                to: newUser.email,
                                subject: 'Conby Account Created!',
                                text: `Thank you creating account in Conby!`,
                                html: 
                                `<h3>Here is your code verification: </h3>
                                <h2>${newUser.codeVerif}</h2>
                                `
                            };
                            transporter.sendMail(mailVerif, (err, info) => {
                                if (err) throw err;
                                console.log('Email sent: ' + info.response + ' to ' + newUser.email);
                            });

                        }))
                    
                    
                }
            });
    }
};

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

        if (user.isVerif == false) {
            return res.status(401).json({
                status: 401,
                message: `you're not verify,please verify your account first`
            });
        }

        // create token
        var token = jwt.sign({ _id: user._id }, process.env.SECRET, {
            expiresIn: 86400 // 1 day
        });

        res.status(200).json({
            status: 200,
            message: 'success! you have logged in',
            data: {
                user: {
                    _id: user._id
                },
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
            message: 'success! your profile has been updated',
            data: dataUser
        });
    }).catch((err) => console.log(err));
};

exports.findOneUser = (req, res) => {
    User.findOne({ _id: req.params.id }).then((user) => {
        res.status(200).json({
            status: 200,
            message: 'success!',
            data: user
        });
    }).catch((err) => console.log(err));
};

exports.findOrderUser = (req, res) => {
    User.findOne({ _id: req.params.id })
        .select({ orders: 1 })
        .populate({
            path: 'orders',
            select: '-user ',
            populate: {
                path: 'consultant',
                select: 'photo name subSpecialist'
            }
        })
        .then((user) => {
            res.status(200).json({
                status: 200,
                message: 'success!',
                data: {user}
            });
        }).catch((err) => console.log(err));
};

exports.verifyUser = (req,res) => {
    User.findOne({ _id: req.params.id }).then((user) => {
        
        code = req.body.kode;
        // console.log("Code : "+ code + "user.codeVerif"+ user.codeVerif);

        // checking input kode sama user.codeVerif sama ato tidak
        if (user.codeVerif != code || code < 1000) {
            return res.status(401).json({
                status: 401,
                message: `code not match`
            });
        }
        // set isVerif ke true
        const setToTrue = {
            isVerif: true
        }

        //update data user
        User.findByIdAndUpdate(req.params.id, setToTrue).then(() => {
            // create token
            var token = jwt.sign({ _id: user._id }, process.env.SECRET, {
                expiresIn: 86400 // 1 day
            });
            console.log('user verified!')
            // respond sukses
            res.status(200).json({
                status: 200,
                message: "success, you're now verified and login!",
                data: {
                    user: {
                        _id: user._id
                    },
                    accessToken: token
                }
            });
        }).catch((err) => console.log(err));


        
    }).catch((err) => console.log(err));


}