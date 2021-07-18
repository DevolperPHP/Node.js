const db = require("../config/database")
const User = require("../models/User");

let newUser = [
    new User({
        name: "Mohammed Majid",
        age: "18",
        location: "Iraq",
        date: Date.now(),
    }),

    new User({
        name: "Ahmed Majid",
        age: "28",
        location: "Iraq",
        date: Date.now(),
    }),

    new User({
        name: "Ali",
        age: "18",
        location: "Iraq",
        date: Date.now(),
    }),

    new User({
        name: "Abd",
        age: "18",
        location: "Iraq",
        date: Date.now(),
    }),
]

newUser.forEach( (users) => {
    users.save((err) => {
        if(err){
            console.log("Error")
        } else {
            console.log("Data saved")
        }
    })
})