const express = require("express");
const path = require('path');
const mysql = require("mysql");
const dotenv = require ("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config({ path: './.env'});

const app = express();

const dataBase = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

dataBase.connect( (error) => {
    if(error) {
        console.log(error);
    } else {
        console.log("MYSQL Connected");
    }
})

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

//Grab data from form
app.use(express.urlencoded({ extended: false}));
//The values of the form, coming in json
app.use(express.json());


app.use(cookieParser());


app.set('view engine','hbs');

//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));


app.listen(5000, () => {console.log("Server started on port 5000");})