const express = require("express");
const goldrateRoute = express.Router()
const { validate } = require("../middleware/validator")


goldrateRoute.get("/", validate, (req, res)=>{
    try{
        res.status(200).send({"mgs": "Gold Rate Page!"})
    }catch(err){
        res.status(400);
        console.log(err)
    }
});

module.exports = {
    goldrateRoute
}
