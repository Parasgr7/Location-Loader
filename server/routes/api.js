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


var request = require("request");

router.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});


router.post('/register', (req, res, next) => {
    console.log(req.body.email);
    request("https://maps.googleapis.com/maps/api/geocode/json?address=" + req.body.location + "&key=AIzaSyBCmnkJo1GSzHxLSiElowXkeuHmRBpMBok", function(err, response1, body1) {
        if (err) {
            res.status(400).json(err);
        } else if (response1.statusCode == 400) {
            // console.log(body);
            res.status(400).json({ success: false, message: 'Invalid id or token provided' });
        } else {
            body1 = JSON.parse(body1);
            let newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                lat: body1.results[0].geometry.location.lat,
                long: body1.results[0].geometry.location.lng



            });
            User.addUser(newUser, (err, user) => {
                console.log(err);
                if (err) {
                    res.json({ success: false, msg: 'Failed to register' });
                } else {

                    res.json({ success: true, msg: 'Succesfully registered' });


                }

            });
        }
    });

});




router.post('/authenticate', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.getUserByEmail(email, (err, user) => {

        if (err) throw err;

        if (!user) {
            return res.json({ success: false, msg: 'User not found' });

        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({ success: false, msg: 'Wrong password' });
            }


        });

    });


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


                User.addUserFace(newUser, (err, user) => {

                    if (err) {
                        res.json({ success: false, msg: 'Failed to register' });
                    } else {
                        console.log(user);
                        // res.json({ success: true, msg: 'Succesfully registered' });

                        const token = jwt.sign(user, config.secret, {
                            expiresIn: 604800
                        });

                        res.json({
                            success: true,
                            token: 'JWT ' + token,
                            user: {
                                uid: user.uid,
                                name: user.name
                            }
                        });

                    }
                });

            });


        }
    });
});




router.get('/fetchCoordinates', passport.authenticate('jwt', { session: false }), (req, res, next) => {

    var result = [];
    User.find(function(err, data) {

        data.forEach(function(user) {
            result.push({ 'lat': user.lat, 'lng': user.long });
        });

        res.send(result);
    });
});



router.get('/fetchUser', passport.authenticate('jwt', { session: false }), (req, res, next) => {

    var result = [];
    User.find(function(err, data) {

        data.forEach(function(user) {
            result.push(user);
        });

        res.send(result);
    });
});



router.get('/fetchFbUser/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {

    User.findOne({ uid: req.params.id }, (err, user) => {
        if (err) {
            console.log(err);
        }
        if (user) {
            res.send(user);
        } else {
            return done(null, false);
        }

    });
});



router.get('/fetchLogUser/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {

    User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            res.send(user);
        } else {
            return done(null, false);
        }

    });
});

module.exports = router;