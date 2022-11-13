const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const IoRedis = require('ioredis');

require('./models');
const routes = require('./routes');

const app = express();

app.use(cors({
    origin: (origin, cb) => {
        cb(null, true)
    },
    credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(routes);

mongoose.connect('mongodb://localhost:27017/zomato')
    .then(() => {
        global.redis = new IoRedis({
            host: 'localhost',
            port: 6379
        });
        app.listen(3001, () => {
            console.log('Server running at port 3001');
        });
    })
    .catch((err) => {
        console.log(err);
    })