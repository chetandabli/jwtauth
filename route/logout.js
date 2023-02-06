const express = require("express");
const logoutRoute = express.Router();
const fs = require("fs");

logoutRoute.get("/", (req, res)=>{
    let token = req.headers.authorization;

    let blockedToken = JSON.parse(fs.readFileSync("blacklisting.json", {encoding: "utf-8"})) || [];
    blockedToken.push(token);
    fs.writeFileSync("blacklisting.json", JSON.stringify(blockedToken), {encoding: "utf-8"})
    if(token){
        res.send({"msg": "user logged out"})
    }else{
        res.send({"msg": "you are alredy logged out"})
    }
    
});

module.exports = {
    logoutRoute
}
