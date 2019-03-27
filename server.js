const express = require('express');
const path = require('path');
const logger = require('morgan');
const helmet = require('helmet');
const config = require('./server-src/config');

const app = express();

// setup
app.use(logger('dev'));
app.use(helmet());



// routes
app.use('/api', function (req, res) {
    res.send('api works?');
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



// handle errors
app.use(function (err, req, res, next) {
    console.log('err =', err);
    res.status(404).send('not found');
});

const port = config.PORT;

app.listen(port, () => {
    console.log(`Express app running on port ${port}`);
});
