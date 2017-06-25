const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

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
    time: { type: Date, default: Date.now }

});

module.exports = mongoose.model('start', UserSchema);
module.exports.addUser = function(newUser, callback) {

    newUser.save(callback);

}