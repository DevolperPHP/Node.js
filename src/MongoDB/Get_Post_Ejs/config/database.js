const mongoose = require('mongoose');
const MONGO_URI = 'mongodb://localhost:27017/subDB';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(err){
        console.log(err)
    } else {
        console.log("Database connected")
    }
})