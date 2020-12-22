const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let mongooseHidden = require('mongoose-hidden')();
const config = require("config");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const locationSchema = require('./location').schema;

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: 'Username cannot be empty'
    },
    email: {
        type: String,
        required: 'Email cannot be empty',
        unique: true
    },
    location: locationSchema,
    profile_photo: {
        type: String
    },
    salt: {type: String, hide: true},
    hash: {type: String, hide: true}
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

userSchema.virtual('Reviews', {
    ref: 'Review',
    localField: 'reviews_ids',
    foreignField: '_id',
    justOne: false,
});

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJWT = function() {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate()+60);

    return jwt.sign({
        user_id: this._id,
        username: this.username,
        exp: exp.getTime() / 1000
    }, config.get("JWT_SECRET"))
};

userSchema.plugin(mongooseHidden);

let User = mongoose.model('User', userSchema);
module.exports = User;