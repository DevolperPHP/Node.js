const express = require("express");
const router = express.Router();
const User = require("../models/User")

router.get('/', (req, res) => {
    User.find({}, (err, data) => {
        if(err){
            console.log(err);
        } else {
            res.render('index', {
                data: data
            })
        }
    })
})

module.exports = router;