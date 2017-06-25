const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/database');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});


mongoose.connection.on('error', (err) => {
    console.log('Database error :' + err);
});


const passport = require('passport');
// Get our API routes
const api = require('./server/routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', api);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
})

app.use('*', function(req, res, next) {
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, DELETE, GET");
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    if (req.method === 'OPTIONS') {
        res.status(200);
        res.end();
    } else {
        next();
    }

});


/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';

app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`Server running on localhost:${port}`));