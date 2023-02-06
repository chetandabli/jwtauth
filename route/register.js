const express = require("express");
const registerRoute = express.Router()
const {Registermodel} = require("../model/Register.model");
const bcrypt = require('bcrypt');

registerRoute.get("/", (req, res)=>{
    res.send("register page")
});

registerRoute.post("/", async(req, res)=>{
    let {name, email, password} = req.body;
    const hash = bcrypt.hashSync(password, 5);
    const {role} = req.body || "user"
    try{
        const user = new Registermodel({name, email, password: hash, role: role});
        await user.save();
        res.status(200).json({"msg": "User Registered"})
    }catch(err){
        res.status(400);
        console.log(err)
    }
});

module.exports = {
    registerRoute
}
