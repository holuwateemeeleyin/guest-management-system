const mongoose = require ('mongoose')
const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken')
const SALT_I = 10;
const config = require('./../config/config').get(process.env.NODE_ENV);

const adminSchema = mongoose.Schema ({
    username : {
        type: String,
        required: true,
        unique: 1,
        trim:true
    },
    password: {
        type:String,
        required:true,
        trim:true
    },
    name: {
        type: String,
        required:true,
    },
    token: {
        type: String
    }

})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = { Admin }
