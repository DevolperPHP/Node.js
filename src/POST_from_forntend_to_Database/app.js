const express = require("express");
const app = express();
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost:27017/postDB', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(!err){
        console.log("Database connected")
    } else {
        console.log(err);
    }
})

const notesSchema = {
    title:{
        type: String,
    },

    content:{
        type: String,
    },
}

const Note = mongoose.model('Note', notesSchema, 'Notes')

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post('/', (req, res) => {
    let newNote = new Note({
        title: req.body.title,
        content: req.body.content,
    })

    newNote.save();
    res.redirect("/")
})

app.listen(3000, () => {
    console.log("running...")
})