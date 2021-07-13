const User = require("../models/User")
const bcrypt = require("bcrypt");
const router = require("express").Router();

// update user

router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err)
            }
        }

        try {
            const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body });
            res.status(200).json("Account has been updated")
        } catch (err) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(403).json("You can update only your account")
    }
})
// delete user

router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {

        try {
            await User.findOneAndDelete(req.params.id);
            return res.status(200).json("Account has been deleted")
        } catch (err) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(403).json("You can delete only your account")
    }
})
// get user

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, updatedAt, ...other} = user._doc
        res.status(200).json(other)
    } catch (err) {
        res.status(500).json(err)
    }
})
// follow a user

router.put("/:id/follow", async (req, res) => {
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.params.userId)

            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{ followers: req.body.userId }})
                await currentUser.updateOne({$push:{ following: req.body.userId }})
                res.status(200).json("user has been followed")
            } else {
                res.status(403).json("You already follow this user")
            }
        } catch(err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("You can follow yourself");
    }
})
// unfollow a user

module.exports = router