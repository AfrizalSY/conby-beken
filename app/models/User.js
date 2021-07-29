const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    baby: {
        name: {
            type: String
        },
        dateOfBirth: {
            type: String
        },
        weight: {
            type: Number
        },
        height: {
            type: Number
        }
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
