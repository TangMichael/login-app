const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require("./config/database");

// connect to database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on("connected", () =>{
    console.log("Connected to database " + config.database);
})

mongoose.connection.on("error", (err)=>{
    console.log("Database error: "+ err);
})

// initialise app variable
const app = express();

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

const users = require("./routes/users");

const port = 3000

app.use(cors());

app.use(bodyParser.json());

// route
app.get("/", (req, res) =>{
    res.send("Invalid Endpoint");
});

app.use("/users", users);



// port and start server
app.listen(port, () =>{
    console.log("Server Started on the port "+ port);
});

