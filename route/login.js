const express = require("express");
const loginRoute = express.Router()
const {Registermodel} = require("../model/Register.model");
const jwt = require('jsonwebtoken');
require('dotenv').config();

loginRoute.get("/", (req, res)=>{
    res.send("login page")
});

loginRoute.post("/", async(req, res)=>{
    const body = req.body;
    try{
        let user = await Registermodel.findOne({"email": body.email});
        if(user){
            const normaltoken = jwt.sign({ userID: user._id }, process.env.normalKey, { expiresIn: '1m' });
            const refreshtoken = jwt.sign({ userID: user._id }, process.env.refreshKey, { expiresIn: '5m' });
            res.status(200).json({"normaltoke": normaltoken, "refreshtoken": refreshtoken})
        }
    }catch(err){
        res.status(400);
        console.log(err)
    }
});

module.exports = {
    loginRoute
}
