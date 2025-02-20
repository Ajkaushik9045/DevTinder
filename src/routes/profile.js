const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const { validateProfileEdit } = require("../utils/validation");
const User = require('./models/user');
const bcrypt = require('bcrypt');

//Profile API
profileRouter.get('/profile', userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(500).send(err.message)
    }
});

//Profile Edit API
profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
    try {
        if (!validateProfileEdit(req)) {
            throw new Error("Invalid Edit request");
        }
        const user = req.user;
        Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));
        await user.save();
        // res.send("User data updated Succesfilly")
        res.json({
            message: "User data updated Succesfully",
            data: user
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
})

// Profile Edit Password
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
    try {
        const loggedINUser = req.user;
        const { oldpassword, newPassword } = req.body;
        const isPasswordCorrect = await User.validatePassword(oldpassword);
        if (!isPasswordCorrect) {
            throw new Error("Old password is incorrect");
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        loggedINUser.password = hashedPassword;
        await loggedINUser.save();
        res.json({
            message: "Password updated Succesfully",
            data: loggedINUser
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = profileRouter;  //export the router to use in other files.  //export