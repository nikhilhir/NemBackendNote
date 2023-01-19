
const mongoose = require("mongoose")
const NoteSchema = mongoose.Schema({
    title:{type:String,required:true},
    note:{Type:String},
    category:String,
    author:String,
    userId:String
    //if not require  no need to write down in body
})

const NoteModel = new mongoose.model("note",NoteSchema)

module.exports=NoteModel