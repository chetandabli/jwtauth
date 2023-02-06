const {Registermodel} = require("../model/Register.model");
const auth = async(req, res, next)=>{
    let user = await Registermodel.findById(req.body.userID);
    if(user.role == "manager"){
        next()
    }else{
        res.status(403).send("forbidden access")
    }
    
}

module.exports = {
    auth
}