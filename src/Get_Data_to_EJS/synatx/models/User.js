const mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
    },

    age:{
        type: Number,
    },

    location:{
        type: String
    },

    date:{
        type: Date,
    }
})

const User = mongoose.model('User', userSchema, 'Users')
module.exports = User;