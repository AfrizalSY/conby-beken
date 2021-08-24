const Consultant = require('../models/consultant');

exports.findTop4Consultants = (req, res) => {
    // sort by rating
    Consultant.find({})
        .sort({ rating: 1 })
        .select({ rating: 1, photo: 1, name: 1, subSpecialist: 1, price: 1 })
        .limit(4)
        .then((consultants) => {
            res.status(200).json({
                status: 200,
                message: 'success!',
                data: consultants
            });
        }).catch((err) => console.log(err));
};

exports.findAllConsultants = (req, res) => {
    Consultant.find({})
        .select({ rating: 1, photo: 1, name: 1, subSpecialist: 1, price: 1 })
        .then((consultants) => {
            res.status(200).json({
                status: 200,
                message: 'success!',
                data: consultants
            });
        }).catch((err) => console.log(err));
};

exports.findOneConsultant = (req, res) => {
    Consultant.findOne({ _id: req.params.id })
        .select({ rating: 1, photo: 1, name: 1, subSpecialist: 1, price: 1, reviews: 1 })
        .populate('reviews.user', 'name photo')
        .then((consultant) => {
            res.status(200).json({
                status: 200,
                message: 'success!',
                data: consultant
            });
        }).catch((err) => console.log(err));
};