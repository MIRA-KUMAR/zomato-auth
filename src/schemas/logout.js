const mongoose = require('mongoose');

module.exports = async (req, res) => {
    const { jti, exp } = req.state;

    redis.set(jti, 'expired', 'EX', 10 * 60);

    res.clearCookie('auth');

    return res.send({ success: true });
};
