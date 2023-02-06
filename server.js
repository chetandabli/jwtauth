const express = require("express");
const app = express();
require('dotenv').config();
const {connection} = require("./configs/db");
const { registerRoute } = require("./route/register")
const { loginRoute } = require("./route/login")
const { goldrateRoute } = require("./route/goldrate")
const { userstatsRoute } = require("./route/userstats")
const { logoutRoute } = require("./route/logout")
const { refreshRoute } = require("./route/refreshtoken")

app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Home Page")
});

app.use("/signup", registerRoute)
app.use("/login", loginRoute)
app.use("/logout", logoutRoute)
app.use("/goldrate", goldrateRoute)
app.use("/userstats", userstatsRoute)
app.use("/refresh", refreshRoute)

app.listen(process.env.PORT, async()=>{
    try{
        await connection;
        console.log("connected to db")
    }catch(err){
        console.log(err)
    }
    console.log("server is running at", process.env.PORT)
});