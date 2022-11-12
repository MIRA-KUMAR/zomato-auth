const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    issuedAt: {
        type: Date
    },
    expiresAt: {
        type: Date
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
    // ua: Object
});

mongoose.model('Cookie', Schema);
