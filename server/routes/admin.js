const express = require ('express')
const router = express.Router();

const {Admin} = require('./../models/admin')

// POST for Registering Admin
router.post ('/register', (req,res)=> {
    const admin = new Admin(req.body)
    admin.save((err, doc)=> {
        if(err) return res.status(400).send(err)
        res.status(200).json ({
            post:true,
            admin:doc
        })
    })
})


// Get all admins
router.get('/admins', (req, res)=> {
    Admin.find({}, (err, admins)=> {
        if(err) return res.status(400).send(err);
        res.status(200).send(admins)
    })
})

module.exports = router