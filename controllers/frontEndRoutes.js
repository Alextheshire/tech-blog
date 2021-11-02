const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require("bcrypt");
const {Post} = require('../models');
const {Comment} = require('../models');

router.get('/',(req,res)=> {
    Post.findAll({
        order:["createdAt"],
        limit:10,
        include:[User]
    }).then((postData)=> {
        const hbsData = postData.map(post=>post.get({plain:true}))
        if(req.session.user){
            for (const obj of hbsData) {
            obj.loggedIn=true
        }
        }
        res.render("home",{
            posts:hbsData
        })
    }).catch(err=>{
        console.log(err)
        res.json(err)
    })
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
                id:foundUser.id,
                username:foundUser.username,
                email:foundUser.email,
                first_name: foundUser.first_name,
                last_name: foundUser.last_name,
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
            id: newuser.id,
            username:newuser.username,
            email:newuser.email,
            first_name: newuser.first_name,
            last_name: newuser.last_name,
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
    req.session.destroy()
    res.render("login")
})

router.get('/dashboard',(req,res)=> {
    res.render("home")
})


router.post('/comment',(req,res)=> {
    Comment.create({
        comment_body: req.body.comment_body,
        UserId: req.session.user.id,
        PostId: req.body.PostId
    }).then(newComment=> {
        res.redirect('/')
    }).catch(err=>{
        console.log(err)
    })
})


module.exports = router;