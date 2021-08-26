const Consultant = require('../models/consultant');
const Admin = require('../models/admin');
const Order = require('../models/order');
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
            status: 201,
            message: 'success! admin has been created'
        });
    }).catch((err) => console.log(err));
};

exports.login = (req, res) => {
    Admin.findOne({ name: req.body.name }).then((admin) => {
        if (!admin) {
            return res.status(401).json({
                status: 401,
                message: `email or password doesn't match!`
            });
        }

        // validate password
        var passwrod = bcrypt.compareSync(req.body.password, admin.password);
        if (!passwrod) {
            return res.status(401).json({
                status: 401,
                message: `email or password doesn't match!`
            });
        }

        // create token
        var token = jwt.sign({ _id: admin._id }, process.env.SECRET, {
            expiresIn: 86400 // 1 day
        });

        res.status(200).json({
            status: 200,
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
    consultant.save().then((savedConsultant) => {
        res.status(201).json({
            status: 201,
            message: 'success! consultant account has been created',
            data: savedConsultant
        });
    }).catch((err) => console.log(err));
};

exports.findOrder = (req, res) => {
    if (!req.query.price) {
        Order.find({})
            .select({ user: 1, price: 1, uniqueCode: 1, totalPrice: 1, status: 1 })
            .populate('user', 'name')
            .then((orders) => {
                res.status(200).json({
                    status: 200,
                    message: 'success!',
                    data: orders
                });
            }).catch((err) => console.log(err));
    } else {
        Order.find({ totalPrice: { $eq: req.query.price } })
            .select({ user: 1, price: 1, uniqueCode: 1, totalPrice: 1, status: 1 })
            .populate('user', 'name')
            .then((orders) => {
                res.status(200).json({
                    status: 200,
                    message: 'success!',
                    data: orders
                });
            }).catch((err) => console.log(err));
    }
};

exports.changeOrderStatus = (req, res) => {
    Order.findByIdAndUpdate(req.params.id, { status: 1 }).then(() => {
        res.status(200).json({
            status: 200,
            message: 'success! order approved'
        });
    }).catch((err) => console.log(err));
};