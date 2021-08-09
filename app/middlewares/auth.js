const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

exports.verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).json({
            message: 'access denied! no token available'
        });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            if (err.message == 'invalid signature') {
                return res.status(401).json({
                    message: 'invalid tokens!'
                });
            } else if (err.message == 'jwt expired') {
                return res.status(401).json({
                    message: 'token period has expired! please login again'
                });
            }
        }
        req.id = decoded._id;
        next();
    });
};

exports.isAdmin = (req, res, next) => {
    Admin.findOne({ _id: req.id }).then((admin) => {
        if (!admin) {
            return res.status(403).json({
                message: 'you cannot access this page!'
            });
        }
        next();
    }).catch((err) => console.log(err));
};