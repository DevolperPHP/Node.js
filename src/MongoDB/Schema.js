const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new mongoose.Schema({
    username:{
        type: String,
        default: "",
        lowercase: true,
    },

    password: {
        type: String,
        default: "",
    },

    email: {
        type: String,
        default: "",
        lowercase: true,
        unique: true,
    },

    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    
    isAdmin: Boolean,
})

module.exports = mongoose.model("User", userSchema);
