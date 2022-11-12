const mongoose = require('mongoose');
const joi = require('joi');
const argon = require('argon2');

module.exports = async (req, res) => {
    const schema = joi.object({
        name: joi.object({
            first: joi.string().required(),
            last: joi.string().required()
        }),
        email: joi.string().email().required(),
        password: joi.string().min(8).max(24).required(),
    });

    const { value, error } = schema.validate(req.body);
    if (error) {
        return res.send(error);
    }

    const UserModel = mongoose.model('User');
    await UserModel.create({
        name: value.name,
        email: {
            address: value.email,
            isVerified: false
        },
        password: await argon.hash(value.password, {
            type: argon.argon2id
        }),
    });

    return res.send({ success: true });
};
