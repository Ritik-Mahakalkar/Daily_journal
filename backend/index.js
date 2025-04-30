const express = require ('express')
const mongoose = require ('mongoose')
const cors = require ('cors')
const UserModule = require('./Module/Users')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/journalApp')

app.delete('/deleteUser/:id', (req , res) =>{
    const id = req.params.id;
    UserModule.findByIdAndDelete({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.put('/userUpdate/:id', (req , res ) =>{
    const  id = req.params.id;
    UserModule.findByIdAndUpdate({_id:id},{
        title:req.body.title,
        content:req.body.content
    })
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get("/getdata/:id", (req , res) =>{
    const id = req.params.id
    UserModule.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get("/getUsers", (req , res) =>{
    UserModule.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post("/create", (req , res) =>{
    UserModule.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})


app.listen(3001,() =>{
    console.log("Server is Running")
})