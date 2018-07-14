const express = require("express");
const router = express.Router();
const User = require("../models/user");
const config = require("../config/database");
const jwt = require("jsonwebtoken");
const passport = require("passport");
// Register
router.post("/register", (req, res, next) => {
    let newUser = new user({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({
                success: false,
                msg: "Failed"
            });
        } else {
            res.json({
                success: true,
                msg: "User Registered"
            });
        }
    });

});

// Authenticate
router.post("/authenticate", (req, res, next) => {
    // res.send("Authentication");
    const username = req.body.username;
    const password = req.body.password;


    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({
                success: false,
                msg: "User not found"
            });
        }
        // careful if using user instead of User, it's gonna use the user from the function which is any
        // instead of using the user from the model at the top
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 // 1 week
                });
                res.json({
                    success: true,
                    token: "JWT " + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({
                    success: false,
                    msg: "Wrong password"
                });
            }
        });
    });
});

// Profile
router.get("/profile", passport.authenticate("jwt", {
    session: false
}), (req, res, next) => {
    res.json({user: req.user})
});

module.exports = router;