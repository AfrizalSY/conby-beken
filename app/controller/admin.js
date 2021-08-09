const Consultant = require('../models/consultant');
const bcrypt = require('bcryptjs');

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
}