const mongoose = require("mongoose")
const MONGO_URI = 'mongodb://localhost:27017/bestDB'

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(!err){
        console.log("DataBase connected");
    } else {
        console.log(err);
    }
})