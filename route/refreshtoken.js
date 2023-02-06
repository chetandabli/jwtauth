const express = require("express");
const jwt = require('jsonwebtoken');
const refreshRoute = express.Router()
require('dotenv').config();

refreshRoute.get("/", (req, res)=>{
    const token = req.headers.authorization;
    if(token){
        try{
            var decoded = jwt.verify(token, process.env.refreshKey);
            if(decoded){
                const normaltoken = jwt.sign({ userID: user._id }, process.env.normalKey, { expiresIn: '1m' });
                const refreshtoken = jwt.sign({ userID: user._id }, process.env.refreshKey, { expiresIn: '5m' });
                res.status(200).json({"normaltoke": normaltoken, "refreshtoken": refreshtoken, "msg": "new normal and refresh token"})
            }
        }catch(err){
            if(err.message == 'jwt expired'){
                res.status(401).send({"massage": "Refresh token is also expired!"});
            }
            
        }
    }
});

module.exports = {
    refreshRoute
}