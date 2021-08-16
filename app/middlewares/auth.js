const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const User = require('../models/user');

exports.verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).json({
            status: 403,
            message: 'access denied! no token available'
        });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            if (err.message == 'invalid signature') {
                return res.status(401).json({
                    status: 401,
                    message: 'invalid tokens!'
                });
            } else if (err.message == 'jwt expired') {
                return res.status(401).json({
                    status: 401,
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
                status: 403,
                message: 'you cannot access this page!'
            });
        }
        next();
    }).catch((err) => console.log(err));
};

exports.isUser = (req, res, next) => {
    User.findOne({ _id: req.id }).then((user) => {
        if (!user) {
            return res.status(403).json({
                status: 403,
                message: 'you cannot access this page!'
            });
        }
        next();
    }).catch((err) => console.log(err));
};