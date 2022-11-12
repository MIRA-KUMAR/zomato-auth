const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
    if (!req.cookies || !req.cookies.auth) {
        return res.send('Unauthorized!');
    }

    const CookieModel = mongoose.model('Cookie');
    const cookie = await CookieModel.findOne({
        _id: mongoose.mongo.ObjectId(req.cookies.auth),
        isDeleted: false
    });

    if (!cookie) {
        return res.send('Unauthorized!');
    }

    if (cookie.expiresAt < new Date()) {
        return res.send('Unauthorized!');
    }

    req.state = {
        userId: cookie.userId,
    };

    next();
}