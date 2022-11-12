const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: {
        first: {
            type: String,
            required: true,
        },
        last: {
            type: String,
            required: true
        }
    },
    email: {
        address: {
            type: String,
            required: true,
            unique: true,
        },
        isVerified: {
            type: Boolean,
            default: false
        }
    },
    avatar: String,
    password: {
        type: String,
        required: true,
    }
});

mongoose.model('User', Schema);
