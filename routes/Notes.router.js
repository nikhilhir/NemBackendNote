const express = require("express")
const NoteModel = require("../Models/Notes.model")



const NotesRouter = new express.Router()

NotesRouter.use(express.json())

NotesRouter.get("/",  async(req,res)=>{
const payload = req.body
     try {
        const notes = await NoteModel.find({})
        res.send(notes)
     } catch (error) {
        res.send(error)
     }
    res.send("All the notes")
})

NotesRouter.post("/create",async(req,res)=>{
    //while create to this first i verify 
    const payload = req.body
        try {
          const createNote = new NoteModel(payload) //create new intence of node
          await createNote.save()
          res.status(201).send({"msg":"notes created"})
        } catch (error) {
            console.log({"msg":"fail to create notes" , "err":error})
        }
})

//compair user id who is making editrequest with id present in note schema
NotesRouter.patch("/edit/:id",async(req,res)=>{
    //verify
    const payload=req.body;
    const id=req.params.id
    const getNote = await NoteModel.findOne({"_id":id})
    const UserId_in_note =getNote.userId
    const userId_making_req=req.body.userId
    try {
      // if("user id who making request"="user id in notes"){}
       if ((userId_making_req !== UserId_in_note)) {
          res.send({"msg":"you are not authorised"})
       }else{
          await NoteModel.findByIdAndUpdate({ _id: id }, payload);
          res.status(201).send({ msg: "notes get Updated" });
       }
    } catch (error) {
        res.status(401).send({"msg":"error while edit note"})
        console.log(error)
    }
    res.send("Update notes")
})

NotesRouter.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
    //verify
    const note = await NoteModel.findOne({ _id: id });
    const UserId_in_note = note.userId;
    const userId_making_req = req.body.userId;
    try {
       if(userId_making_req !== UserId_in_note){
        res.send({"msg":"you are not authorize"})
       }else{
        await NoteModel.findByIdAndDelete({"_id":id})
        res.send("DEleted notes")
       }


    } catch (error) {
        res.send({"msg":"something went wrong"})
    }
    res.send("Deleted")
})

module.exports=NotesRouter