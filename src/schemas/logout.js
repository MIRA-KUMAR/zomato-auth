const mongoose = require('mongoose');

module.exports = async (req, res) => {
    const CookieModel = mongoose.model('Cookie');
    await CookieModel.updateOne({
        _id: mongoose.mongo.ObjectId(req.cookies.auth)
    }, {
        $set: {
            isDeleted: true
        }
    });

    res.clearCookie('auth');

    return res.send({ success: true });
};
