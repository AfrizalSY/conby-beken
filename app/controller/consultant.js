const Consultant = require('../models/consultant');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    Consultant.findOne({ email: req.body.email }).then((consultant) => {
        if (!consultant) {
            return res.status(401).json({
                message: `email or password doesn't match!`
            });
        }

        // validate password
        var password = bcrypt.compareSync(req.body.password, consultant.password);
        if (!password) {
            return res.status(401).json({
                message: `email or password doesn't match!`
            });
        }

        // create token
        var token = jwt.sign({ _id: consultant._id }, process.env.SECRET, {
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