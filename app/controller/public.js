const Consultant = require('../models/consultant');

exports.findTop4Consultants = (req, res) => {
    // sort by rating
    Consultant.find({})
        .sort({ rating: 1 })
        .select({ rating: 1, photo: 1, name: 1, subSpecialist: 1, price: 1 })
        .limit(4)
        .then((consultants) => {
            res.status(200).json({
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
                message: 'success!',
                data: consultants
            });
        }).catch((err) => console.log(err));
};