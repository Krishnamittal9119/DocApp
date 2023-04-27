//Express, Morgan, colors, dotenv, nodemon, mongoose, jsonwebtoken, bcryptjs
// nvc architecture
//scripts in package.json
// axios antd

const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//configure dotenv
dotenv.config();

// Mongodb Connection

connectDB();

// rest object
const app = express();

//middleware
app.use(express.json());
app.use(morgan('dev'));

//routes

app.use('/api/v1/user',require("./routes/userRoutes"));
app.use('/api/v1/admin',require('./routes/adminRoutes'));
app.use('/api/v1/doctor',require("./routes/doctorRoutes"));


//port
const port = process.env.PORT || 8000

// listen port
app.listen(port, ()=>{
    console.log(`server running in ${process.env.NODE_MODE} MODE on port ${process.env.port}`.bgCyan.white)
});