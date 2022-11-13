const routes = require('express').Router();

const AuthMiddleware = require('./middlewares/auth');

const Signup = require('./schemas/signup');
const Login = require('./schemas/login');
const Logout = require('./schemas/logout');

routes.post('/signup', Signup);
routes.post('/login', Login);
routes.get('/logout', AuthMiddleware, Logout);
routes.get('/introspect', AuthMiddleware, (req, res) => {
    return res.send({ success: true });
});

module.exports = routes;
