const express = require("express");
const connection = require("./config/db")
// const UserMOdel = require("./Models/Register.module")
// const jwt = require("jsonwebtoken")
// const bcrypt = require("bcryptjs")
const cors = require("cors")
require("dotenv").config()

const PORT =process.env.PORT || 8080

const userRouter = require("./routes/User.routes")
const NotesRouter = require("./routes/Notes.router")
const authentication = require("./middlewares/authentication.js");

const app =express()
app.use(express.json())
app.use(cors({origin:"*"}))

app.get("/",(req,res)=>{
    res.send("welcome page")
})

app.get("/about", (req, res) => {
  res.send("welcome about page");
});

app.get("/data", (req, res) => {
//jwt verify token
// const token = req.query.token
const token = req.headers.authorization
jwt.verify(token,"secret_key",function(err,decoded){
    if(err){
        res.send("invalid token")
        console.log(err)
    }else{
        res.send("this is data page")
    }
})

    // const token = req.query.token
    // if(token==="abc123"){
     
    //  res.send("welcome  data page");

    // }else{
    //     res.send("login first")
    // }
});


app.use("/user",userRouter)
app.use(authentication);
app.use("/notes",NotesRouter)

app.listen(PORT,async()=>{
    try {
        await connection;
        console.log("connected to db")
    } catch (error) {
        console.log("fail to connect db",error)
    }
    console.log(`http://localhost:${PORT}`)
})


//to check
// bcrypt.compair(plaintextpass,hash,(err,result)=>{
//plaintext pass you pass while login
//hash pass inside database to get it userModel.find({uing email only})
// })

//find() //return obj under arr
//findOne()//return only that object


//this all are restricted route 
//notes
//note/create
//notes
//note/update/:id
//note/delete/:id



// {
    
//     "title":"NodeJs",
//     "note":"masai",
//     "category":"backend",
//     "author":"john baba"
// }