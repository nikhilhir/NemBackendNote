
const express = require("express")
const userRouter = new express.Router()
const UserMOdel = require("../Models/Register.module");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

require("dotenv").config()



//INCREAPTED PASSWORD
//connecting to db geting something it take time so use async await
//our USEMoDEL IS constructor function make new intence from it
userRouter.post("/register", async (req, res) => {
  const { name, pass, email, age } = req.body; //data in body cliend side
  //inside this data or payload have password destucture
  try {
    bcrypt.hash(pass, 5, async (err, hash_pass) => {
      //store hash pass in db
      if (err) {
        //this error is error encountered while hashing
        console.log(err);
      } else {
        //create new intence using constructor function name user add data as parameter
        const user = new UserMOdel({ name, pass: hash_pass, email, age }); //while save register data save hash password
        //save the data in our database
        await user.save();
        res.send("user register");
      }
    });
  } catch (error) {
    //err while hashing
    res.send("registration fail");
    console.log(error);
  }
});

//DECREPTED PASSWORD
userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    //find use by pass email only
    const finduser = await UserMOdel.find({ email: email }); //only find working

    //if data not match it return empty array to avoid this
    if (finduser.length > 0) {
      //finduser[0].pass = hashpassword in data base arr first value of array
      //decrepted
      bcrypt.compare(pass, finduser[0].pass, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userId: finduser[0]._id },
            process.env.SECRET_KEY
          ); //foo:bar general paylod pass random payload  seckret key use to decreapt it
          //console.log(finduser);
          res.send({ msg: "user login successfull", token: token });
        } else {
          res.send("wrong credential");
        }
      });
    } else {
      res.send("wrong crediential");
    }
  } catch (error) {
    res.send("fail to login");
    console.log(error);
  }
});


module.exports=userRouter
