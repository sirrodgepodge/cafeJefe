'use strict'; 

var mongoose = require('mongoose'),
	shortid = require('shortid'),
	crypto = require('crypto');

var db = require('../../db');
var Story = require('../stories/story.model');

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
	salt: String
});

User.virtual('password').set(function(unhashedPassword){
	this.set('salt', crypto.randomBytes(16).toString('base64'));
	this.set('hashedPassword', crypto.pbkdf2Sync(unhashedPassword, this.salt, 0, 16).toString('base64'));
});

User.statics.findByEmails = function (set) {
	return this.find({emails: {$elemMatch: {$in: set}}});
};

User.statics.findByEmail = function (email) {
	return this.findOne({emails: {$elemMatch: {$eq: email}}});
};

User.methods.getStories = function () {
	return Story.find({author: this._id}).exec();
};

User.methods.authenticate = function () {
	return Story.find({author: this._id}).exec();
};

module.exports = db.model('User', User);