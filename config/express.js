const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const path = require('path');
const cookieParser = require("cookie-parser");
// const sessions = require('express-session');

global.appRoot = path.resolve(__dirname);

const app = express();
app.disable('x-powered-by');
app.use(cors());
app.use(cookieParser());
app.use('/api/static', express.static('public')); // Static public assets
app.use('/api', express.static('upload'));

// initialize passport

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));

// only use the bodyParser for routes other than webhooks
app.use((req, res, next) => {
    if (req.originalUrl === '/api/stripe/webhook') {
        next();
    } else {
        bodyParser.json({ limit: '20mb' })(req, res, next);
    }
});

module.exports = app;
