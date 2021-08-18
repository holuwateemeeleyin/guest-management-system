const express = require('express')
const router = express.Router();

const { Visitor } = require ('../models/visitor')
const { visitorAuth } = require('../middleware/visitorAuth')

// POST for checking in or creating vistors
router.post('/create', (req,res)=> {
    const visitor = new Visitor(req.body)
    visitor.save((err, doc)=> {
        if(err) return res.status(400).send(err);
        res.status(200).json ({
            post:true,
            visitor: doc
        })
    })
})

// Get for getting visitors that checked in
router.get('/get-visitors', (req, res)=> {
    Visitor.find({},(err, visitors)=> {
        if(err) return res.status(400).send(err);
        res.status(200).send(visitors)
    })
})

// If Visitor is authenticated, get this
router.get('/visitorAuth', visitorAuth,(req,res)=>{
    res.json({
        isAuth:true,
        id:req.visitor._id,
        name:req.visitor.name,
        email:req.visitor.email,
        phone:req.visitor.phone,
        purpose:req.visitor.purpose,
        visitorHost:req.visitor.visitorHost
    })
})


// Confirming checking for visitors
router.post('/checkin', (req,res)=> {
    Visitor.findOne({'email':req.body.email}, (err,visitor)=> {
        if(!visitor) return res.json({
            isAuth:false,
            message:'email has not checked in'
        });
        // pass the method 'generateToken' here
        visitor.generateToken((err, visitor)=> {
            if(err) return res.status(400).send(err);
            res.cookie('visitorAuth', visitor.token).json({
                isAuth:true,
                id:visitor._id,
                name:visitor.name,
                phoneNo:visitor.phone,
                email: visitor.email,
                purpose: visitor.purpose,
                visitorHost: visitor.visitorHost

            })
        })
    })
})

// visitors checkout (not working yet)
router.get('/api/checkout', visitorAuth, (req, res)=>{
    req.visitor.deleteToken(req.token, (err, user)=> {
        if(err) return res.status(400).send(err)
        res.sendStatus(200)
    })
})


module.exports = router