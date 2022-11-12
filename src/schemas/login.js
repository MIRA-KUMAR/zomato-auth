const mongoose = require('mongoose');
const joi = require('joi');
const argon = require('argon2');

module.exports = async (req, res) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(8).max(24).required(),
    });

    const { value, error } = schema.validate(req.body);
    if (error) {
        return res.send(error);
    }

    const UserModel = mongoose.model('User');
    const user = await UserModel.findOne({
        'email.address': value.email
    });

    if (!user) {
        return res.send('Invalid email!');
    }

    if (!user.email.isVerified) {
        return res.send('Not verified!');
    }

    if (!(await argon.verify(user.password, value.password))) {
        return res.send('Invalid password!');
    }

    const CookieModel = mongoose.model('Cookie');
    const cookie = await CookieModel.create({
        userId: user._id,
        issuedAt: new Date(),
        expiresAt: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
    });

    res.cookie('auth', cookie._id, {
        httpOnly: true,
        domain: 'localhost',
        maxAge: 24 * 60 * 60 * 1000
    });

    return res.send({ success: true });
};
