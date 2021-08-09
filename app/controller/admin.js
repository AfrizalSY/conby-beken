const Consultant = require('../models/consultant');
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');

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