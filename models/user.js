const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

const bcrypt = require('bcryptjs');

const config = require('../config/database');

const UserSchema = mongoose.Schema({
    uid: {
        type: Number
    },
    name: {
        type: String

    },
    gender: {
        type: String

    },
    dp: {
        type: String
    },
    locale: {
        type: String

    },
    timezone: {
        type: Number

    },
    lat: {

        type: Number
    },
    long: {
        type: Number
    },
    city: {
        type: String
    },

    country: {
        type: String
    },
    email: {
        type: String
    },

    password: {
        type: String
    },
    time: { type: Date, default: Date.now }

});

const User = module.exports = mongoose.model('start', UserSchema);

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.addUserFace = function(newUser, callback) {

    newUser.save(callback);
}


module.exports.getUserByEmail = function(email, callback) {
    const query = { email: email };
    User.findOne(query, callback);

}


module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {

        if (err) { console.log(candidatePassword) };
        callback(null, isMatch);
    });
}