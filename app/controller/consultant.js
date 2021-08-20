const Consultant = require('../models/consultant');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    Consultant.findOne({ email: req.body.email }).then((consultant) => {
        if (!consultant) {
            return res.status(401).json({
                status: 401,
                message: `email or password doesn't match!`
            });
        }

        // validate password
        var password = bcrypt.compareSync(req.body.password, consultant.password);
        if (!password) {
            return res.status(401).json({
                status: 401,
                message: `email or password doesn't match!`
            });
        }

        // create token
        var token = jwt.sign({ _id: consultant._id }, process.env.SECRET, {
            expiresIn: 86400 // 1 day
        });

        res.status(200).json({
            status: 200,
            message: 'success! you have logged in',
            data: {
                consultant: {
                    _id: consultant._id
                },
                accessToken: token
            }
        });
    }).catch((err) => console.log(err));
};

exports.updateProfile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            status: 400,
            message: 'photo must be attached!'
        });
    }

    const dataConsultant = {
        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth,
        password: bcrypt.hashSync(req.body.newPassword, 10),
        subSpecialist: req.body.subSpecialist,
        bankAccountNumber: req.body.bankAccountNumber,
        price: req.body.price,
        photo: req.file.path
    };

    Consultant.findByIdAndUpdate(req.params.id, dataConsultant).then(() => {
        res.status(200).json({
            status: 200,
            message: 'success! your profile has been updated',
            data: dataConsultant
        });
    }).catch((err) => console.log(err));
};