const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require("bcrypt")

router.get('/',(req,res)=> {
    res.render("home")
})

router.get('/login',(req,res)=> {
    res.render("login")
})

router.post('/login',(req,res)=> {
    User.findOne({
        where:{
            username:req.body.username
        }
}).then(foundUser=>{
    if(!foundUser){
        req.session.destroy()
        res.status(401).json({message:"incorrect email or password"})
    } else {
        if(bcrypt.compareSync(req.body.password,foundUser.password)){
            req.session.user = {
                username:foundUser.username,
                email:foundUser.email,
                first_name: foundUser.first_name,
                last: foundUser.last,
            }
            res.json(foundUser)
        } else {
            req.session.destroy()
            res.status(401).json({message:"incorrect email or password"})
        }
    }
}).catch(err=>{
     console.log(err);
    res.status(500).json(err);
})
})

router.post('/signup',(req,res)=>{
    User.create({
        username : req.body.username,
        email : req.body.email,
        first_name : req.body.fname,
        last_name : req.body.lname,
        password : req.body.password
    }).then(newuser=>{
        req.session.user = {
        username : req.body.username,
        email : req.body.email,
        first_name : req.body.fname,
        last_name : req.body.lname,
        }
        res.json(newuser)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:"an error occured",err:err})
    })
})

router.get('/signup',(req,res)=> {
    res.render("signup")
})

router.get('/logout',(req,res)=> {
    res.render("logout")
})

router.get('/dashboard',(req,res)=> {
    res.render("home")
})





module.exports = router;