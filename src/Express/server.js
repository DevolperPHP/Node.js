
const express = require('express') ;

const app = express() ;

app.use((req , res) =>{
    res.json({
        meassage : "Express working",
        sucsess : 'true'
    })
})

module.exports = app ;
