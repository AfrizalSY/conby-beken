const Consultant = require('../models/consultant');

exports.findTop5Consultants = (req, res) => {
    // sort by rating
    Consultant.find({})
        .sort({ rating: 1 })
        .select({ rating: 1, photo: 1, name: 1, subSpecialist: 1, price: 1 })
        .limit(5)
        .then((consultants) => {
            return res.status(200).json({
                message: 'success!',
                data: consultants
            });
        }).catch((err) => {
            console.log('>> error: ', err);
            return res.status(500).json({
                error: err.message
            });
        });
};