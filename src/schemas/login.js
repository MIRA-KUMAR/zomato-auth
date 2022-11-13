const mongoose = require('mongoose');
const joi = require('joi');
const argon = require('argon2');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

module.exports = async (req, res) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(8).max(24).required(),
        type: joi.string().valid('cookie', 'bearer').default('cookie'),
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

    const token = jwt.sign({
        email: value.email,
        avatar: user.avatar,
    }, 'secret', {
        expiresIn: '24h',
        issuer: 'localhost',
        algorithm: 'HS256',
        subject: user._id.toString(),
        jwtid: uuid.v4(),
    });

    if (value.type === 'cookie') {
        res.cookie('auth', token, {
            httpOnly: true,
            domain: 'localhost',
            maxAge: 24 * 60 * 60 * 1000
        });
    
        return res.send({ success: true });
    }

    return res.send({
        success: true,
        token: `Bearer ${ token }`,
    });
};
