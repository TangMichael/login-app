const express = require("express");
const router = express.Router();
const user = require("../models/user");

const jwt = require("jsonwebtoken");

// Register
router.post("/register", (req,res, next) =>{
    let newUser = new user({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    
    user.addUser(newUser, (err, user) =>{
        if(err){
            res.json({success: false, msg: "Failed"});
        } else{
            res.json({success:true, msg: "User Registered"});
        }
    });

});

// Authenticate
router.get("/authenticate", (req,res, next) =>{
    res.send("Authentication");
});

// Profile
router.get("/profile", (req,res, next) =>{
    res.send("Profile");
});

module.exports = router;