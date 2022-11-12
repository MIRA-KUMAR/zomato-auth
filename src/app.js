const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

require('./models');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(routes);

mongoose.connect('mongodb://localhost:27017/zomato')
    .then(() => {
        app.listen(3001, () => {
            console.log('Server running at port 3001');
        });
    })
    .catch((err) => {
        console.log(err);
    })