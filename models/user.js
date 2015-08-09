'use strict';

var mongoose = require('mongoose'),
    shortid = require('shortid'),
    crypto = require('crypto');

var db = require('../../mongooseInit');

var User = new mongoose.Schema({
    _id: {
        type: String,
        unique: true,
        default: shortid.generate
    },
    name: String,
    photo: String,
    phone: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    hashedPassword: String,
    salt: {
        type: String,
        default: generateSalt
    }
});

User.virtual('password').set(function(unhashedPassword) {
    this.set('hashedPassword', hashItUp(unhashedPassword, this.salt));
});

function generateSalt() {
    return crypto.randomBytes(16).toString('base64');
}

function hashItUp(notHashed, salt) {
    return crypto.pbkdf2Sync(notHashed, salt, 0, 16).toString('base64');
}

// User.statics.findByEmails = function(set) {
//     return this.find({
//         emails: {
//             $elemMatch: {
//                 $in: set
//             }
//         }
//     });
// };

User.statics.findByEmail = function(email) {
    return this.findOne({
        emails: {
            $elemMatch: {
                $eq: email
            }
        }
    });
};

// User.methods.getStories = function() {
//     return Story.find({
//         author: this._id
//     }).exec();
// };

User.statics.count = function() {
    return this.find().length;
};

User.methods.authenticate = function(password, cb) {
    if (this.hashedPassword === hashItUp(password, this.salt)) cb(null, user);
    else {
        var err = new Error(process.enc.NODE_ENV === 'production' ? 'wrong password' : 'username does not exist');
        err.status = 401;
        cb(err, null); //test returned.constructor.name === "Error"
    }
};

module.exports = db.model('User', User);