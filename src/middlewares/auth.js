const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        if ((req.cookies && req.cookies.auth) || req.headers.authorization) {
            const verifiedToken = jwt.verify(req.cookies.auth || req.headers.authorization.replace('Bearer ', ''), 'secret');

            req.state = {
                userId: verifiedToken.sub,
                jti: verifiedToken.jti,
                exp: verifiedToken.exp
            };
        
            return next();
        }
    
        return res.send({
            success: false,
            value: null,
            error: 'Unauthorized!',
        });
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            return res.send({
                success: false,
                value: null,
                error: 'Unauthorized!',
            });
        }

        return res.send({
            success: false,
            value: null,
            error: 'Please try after some time!',
        });
    }
}