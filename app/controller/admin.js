const Consultant = require('../models/consultant');
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
    // create admin
    const admin = new Admin({
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 10)
    });

    // save admin
    admin.save().then(() => {
        res.status(201).json({
            message: 'success! admin has been created'
        });
    }).catch((err) => console.log(err));
};

exports.login = (req, res) => {
    Admin.findOne({ name: req.body.name }).then((admin) => {
        if (!admin) {
            return res.status(401).json({
                message: `email or password doesn't match!`
            });
        }

        // validate password
        var passwrod = bcrypt.compareSync(req.body.password, admin.password);
        if (!passwrod) {
            return res.status(401).json({
                message: `email or password doesn't match!`
            });
        }

        // create token
        var token = jwt.sign({ _id: admin._id }, process.env.SECRET, {
            expiresIn: 1800 // 30 minutes
        });

        res.status(200).json({
            message: 'success! you have logged in',
            data: {
                accessToken: token
            }
        });
    }).catch((err) => console.log(err));
};

exports.createConsultantAccount = (req, res) => {
    // create consultant
    const consultant = new Consultant({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    });

    // save consultant
    consultant.save().then(() => {
        res.status(201).json({
            message: 'success! consultant account has been created'
        });
    }).catch((err) => console.log(err));
};