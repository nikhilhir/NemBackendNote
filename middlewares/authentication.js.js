
//middleware for verify user while deals with notes router

//to authenticate we needd jsonwebtoken
const jwt = require("jsonwebtoken");
require("dotenv").config();


const authentication = (req,res,next)=>{
   //to verify we need token , where from we get token from header
    token = req.headers.authorization
    if(token){                  
    const decoded = jwt.verify(token, process.env.SECRET_KEY); //verify(token,seckretkey)
    if(decoded){
        const userId=decoded.userId
        console.log("decoded in middleware   "+decoded)  //we will send user id in the req.body
        req.body.userId=userId  //while creating notes not to have pass ser id
        next() //next means next router
    }else{
        res.send("please login first")
    }
    }else{
        res.send("please login again")
    }
  }


  module.exports=authentication










// var jwt = require("jsonwebtoken");

// require("dotenv").config()



// const authentication = (req,res,next)=>{
//     if(!req.headers.authorization){
//         return res
//           .status(401)
//           .send({ msg: "authentication failed pleaze login again" });
//     }
//     const user_token = req.headers.authorization.split(" ")[1];
//     jwt.verify(user_token, procerss.env.jwt_key,function(err,decoded){
//         if(err){
//             console.log(err)
//             return res
//               .status(401)
//               .send({ msg: "authentication failed pleaze login again" });
//         }
//         console.log(decoded);
//         next()
//     });
// }

// module.exports = authentication