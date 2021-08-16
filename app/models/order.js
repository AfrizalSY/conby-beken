const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        idUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        idConsultant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'consultant',
            required: true
        },
        consultationDate: {
            type: String,
            required: true
        },
        consultationTime: {
            type: String,
            required: true
        },
        evidenceOfTransfer: {
            type: String
        },
        price: {
            type: Number
        },
        uniqueCode: {
            type: Number
        },
        totalPrice: {
            type: Number
        },
        status: {
            type: Boolean,
            default: false
        }
    }, { timestamps: true }
);

const Order = mongoose.model('order', OrderSchema);

module.exports = Order;