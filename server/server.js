const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require ('cookie-parser')
const mongoose = require('mongoose')
const config = require('./config/config').get(process.env.NODE_ENV)
const app = express()

// Seting database
mongoose.Promise = global.Promise
mongoose.connect(config.DATABASE)


const visitor = require ('./routes/visitor')
const admin = require ('./routes/admin')


app.use(bodyParser.json());
app.use(cookieParser())

app.use('/api/visitor', visitor)
app.use('/api/admin', admin)

const port = process.env.PORT || 3001;
app.listen(port, ()=> {
    console.log('Server is running now');
})