const path = require("path");
const a = "";
const express = require("express");
const bcrypt = require("bcryptjs");
const fs = require('fs');
const session = require("express-session")

const hbs = require("hbs");
require("./db/conn");

const Reg = require("./models/register")
const app = express();
const port = process.env.port||3078;
//console.log(path.join(__dirname,"../css"));
const statepath = path.join(__dirname,"../");
const statepath1 = path.join(__dirname,"../login");
const statepath2 = path.join(__dirname,"../css");
const actualpath = path.join(__dirname,"../views/main")

const partialpath = path.join(__dirname,"../parts")

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(statepath))
app.use(express.static(statepath1))
app.use(express.static(statepath2));
app.set("view engine ","hbs")
app.set("views",actualpath);
hbs.registerPartials(partialpath);

app.get("/regs",(req, res) => {
    res.render("regs.hbs");
   
})


app.get(("/login"), (req,res) => {
    res.render("login.hbs")
})
app.get(("/login/register.html"), (req,res) => {
    res.send("<a style =' text-decoration: none; color: red; background-color:green; font-size:50px;' href='/register'>Click here for registration </a>")
   
})
app.get("/home", (req,res) => {

    res.render("index.hbs")
})
app.get("/", (req,res) => {

    res.render("index.hbs")
})






app.post("/regs",async(req,res) => {
    try{
        const password = req.body.password;
        const Cpassword = req.body.Cpassword;
        if(password===Cpassword){

            const  info = new  Reg({
                name:req.body.Name,
                email:req.body.email,
                password:req.body.password,
                Cpassword:req.body.Cpassword,
                gender:req.body.gender
            })
            const result =await info.save();
            res.status(201).render("login.hbs")
        }else{
            res.send("password are not matching")
        }

       // console.log(req.body.Name)
       // res.send(req.body.Name)
        //res.send(req.body.email)
    }catch(err){
        res.status(400).send(err);
    }
})
app.post("/login", async(req,res) => {
    try{
    const email = req.body.email;
    const password = req.body.password;
    const useremail = await  Reg.findOne({email:email});
   
    
    console.log(useremail.name); 
    const isMatch = bcrypt.compare(password,useremail.password) 
    
    if(isMatch){
       
        res.status(201).render("index.hbs");
        
    }else{
        res.send("sorry we are not getting you")
    }
    }catch(err){
        res.status(401).send(err);
    }
})

app.listen(port, () => {
    console.log("connection is done");
})
