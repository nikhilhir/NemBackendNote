const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config()


const connection = new mongoose.connect(process.env.MONGO_URL);

module.exports=connection

//connect our data base no need schema and model