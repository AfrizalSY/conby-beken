const mongoose = require('mongoose');

const ConsultantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
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
        }
    },
    { timestamps: true }
);

const Consultant = mongoose.model('consultant', ConsultantSchema);

module.exports = Consultant;