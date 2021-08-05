const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        photo: {
            type: String
        },
        baby: {
            name: {
                type: String
            },
            dateOfBirth: {
                type: String
            },
            gender: {
                type: String
            },
            height: {
                type: Number
            },
            weight: {
                type: Number
            }
        }
    }, { timestamps: true }
);

const User = mongoose.model('user', UserSchema);

module.exports = User;
