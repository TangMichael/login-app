const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/database");

// User Schema

const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const user = module.exports = mongoose.model("user", userSchema);

// to export functions to be used: module.exports.functionsUsedOutside
module.exports.getUserById = function (id, callback) {
    user.findById(id, callback);
}

module.exports.getUserByUsername = function (username, callback) {
    const query = {
        username: username
    };
    user.findOne(query, callback);
}

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
                throw err;
            }
            newUser.password = hash;
            newUser.save(callback);
        })
    })
}