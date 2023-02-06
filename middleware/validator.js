const jwt = require('jsonwebtoken');
require('dotenv').config();
const fs = require("fs");

const validate = (req, res, next)=>{
    const token = req.headers.authorization;
    let blockedToken = JSON.parse(fs.readFileSync("blacklisting.json", {encoding: "utf-8"})) || [];
    if(blockedToken.includes(token)){
        res.status(401).send({"massage": "Token is blacklisted!"});
    }else{
        if(token){
            try{
                var decoded = jwt.verify(token, process.env.normalKey);
                if(decoded){
                    req.body.userID = decoded.userID
                    next()
                }
            }catch(err){
                if(err.message == 'jwt expired'){
                    res.status(401).send({"massage": "Please generate new normal token with route /refresh and refresh token in header"});
                }
                
            }
        }else{
            res.status(401).send({"massage": "Please login!"}); 
        }
    }
    
}

module.exports = {
    validate
}