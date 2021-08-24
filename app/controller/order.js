const Order = require('../models/order');
const User = require('../models/user');
const Consultant = require('../models/consultant');

exports.createOrder = (req, res) => {
    // find consultant's price
    var consultantPrice;
    Consultant.findOne({ _id: req.params.id }).then((consultant) => {
        consultantPrice = consultant.price;

        // generate unique code
        var uniqueCode = Math.floor(Math.random() * 1000);

        // create order
        const order = new Order({
            user: req.id,
            consultant: req.params.id,
            consultationDate: req.body.consultationDate,
            consultationTime: req.body.consultationTime,
            price: consultantPrice,
            uniqueCode: uniqueCode,
            totalPrice: consultantPrice + uniqueCode
        });

        order.save().then((savedOrder) => {
            User.findByIdAndUpdate(req.id, { $push: { orders: savedOrder._id } }).then(() => {
                Consultant.findByIdAndUpdate(req.params.id, { $push: { orders: savedOrder._id } }).then(() => {
                    res.status(201).json({
                        status: 201,
                        message: 'success! created order',
                        data: savedOrder
                    });
                }).catch((err) => console.log(err));
            }).catch((err) => console.log(err));
        }).catch((err) => console.log(err));
    }).catch((err) => console.log(err));
};

exports.checkout = (req, res) => {
    Order.findOne({ _id: req.params.id })
        .populate('consultant', 'rating photo name subSpecialist')
        .then((order) => {
            if (order.user != req.id) {
                return res.status(403).json({
                    status: 403,
                    message: 'you cannot access this page!'
                });
            }

            res.status(200).json({
                status: 200,
                message: 'success!',
                data: order
            });
        }).catch((err) => console.log(err));
};

exports.rateConsultant = (req, res) => {
    Order.findOne({ _id: req.params.id }).then((order) => {
        if (order.user != req.id) {
            return res.status(403).json({
                status: 403,
                message: 'you cannot access this page!'
            });
        }

        const dataConsultant = {
            user: req.id,
            rating: req.body.rating,
            description: req.body.description
        };
    
        Consultant.findByIdAndUpdate(order.consultant, { $push: { reviews: dataConsultant } }).then((consultant) => {
            // calculate consultant's rating
            var newRating = 0;
            var nRating = consultant.reviews.length;
            for (let i = 0; i < nRating; i++) {
                newRating += consultant.reviews[i].rating;
            }
            newRating += req.body.rating;
            newRating /= nRating + 1;
            newRating.toFixed(1);
            Consultant.findByIdAndUpdate(order.consultant, { rating: newRating }).then(() => {
                res.status(200).json({
                    status: 200,
                    message: 'success!',
                    data: dataConsultant
                });
            });
        });
    }).catch((err) => console.log(err));
};