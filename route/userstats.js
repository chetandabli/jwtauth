const express = require("express");
const userstatsRoute = express.Router();
const { validate } = require("../middleware/validator")
const { auth } = require("../middleware/auth")

userstatsRoute.get("/",validate, auth, (req, res)=>{
    try{
        res.status(200).send({"mgs": "user stats Page!"})
    }catch(err){
        res.status(403);
        console.log(err)
    }
});


module.exports = {
    userstatsRoute
}
