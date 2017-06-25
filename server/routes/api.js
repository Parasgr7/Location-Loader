const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const multer = require('multer');
const assert = require('assert');
const User = require('../../models/user');
const config = require('../../config/database');

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var request = require("request");

router.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});




router.post('/facebook', function(req, res, next) {
    console.log(req.body);
    request("https://graph.facebook.com/v2.9/" + req.body.id + "?fields=id,name,gender,picture,locale,timezone,location&access_token=" + req.body.token, function(err, response, body) {
        if (err)
            res.status(400).json(err);
        else if (response.statusCode == 400) {
            // console.log(body);
            res.status(400).json({ success: false, message: 'Invalid id or token provided' });
        } else {
            body = JSON.parse(body);
            console.log('Facebook');
            console.log(body.location.id);


            request("https://graph.facebook.com/v2.9/" + body.location.id + "?fields=location&access_token=" + req.body.token, function(err, response1, body1) {

                body1 = JSON.parse(body1);
                console.log(body1);
                let newUser = new User({
                    uid: body.id,
                    name: body.name,
                    gender: body.gender,
                    locale: body.locale,
                    timezone: body.timezone,
                    lat: body1.location.latitude,
                    long: body1.location.longitude,
                    dp: body.picture.data.url,
                    city: body1.location.city,
                    country: body1.location.country

                });


                User.addUser(newUser, (err, user) => {

                    if (err) {
                        res.json({ success: false, msg: 'Failed to register' });
                    } else {

                        res.json({ success: true, msg: 'Succesfully registered' });


                    }
                });

            });



        }
    });
});



router.get('/fetchCoordinates', (req, res, next) => {

    var result = [];
    User.find(function(err, data) {

        data.forEach(function(user) {
            result.push({ 'lat': user.lat, 'lng': user.long });
        });

        res.send(result);
    });
});



router.get('/fetchUser', (req, res, next) => {

    var result = [];
    User.find(function(err, data) {

        data.forEach(function(user) {
            result.push(user);
        });

        res.send(result);
    });
});

module.exports = router;