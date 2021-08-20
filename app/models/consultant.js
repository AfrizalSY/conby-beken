const mongoose = require('mongoose');

const ConsultantSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String,
            required: true
        },
        dateOfBirth: {
            type: String
        },
        password: {
            type: String,
            required: true
        },
        subSpecialist: {
            type: String
        },
        bankAccountNumber: {
            type: String
        },
        price: {
            type: Number
        },
        photo: {
            type: String
        },
        rating: {
            type: Number,
            default: 0
        },
        orders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'order'
            }
        ]
    },
    { timestamps: true }
);

const Consultant = mongoose.model('consultant', ConsultantSchema);

module.exports = Consultant;