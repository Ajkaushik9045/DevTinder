const express = require('express');
const authRouter = express.Router();
const User = require("../model/user");
const { validateSignUpData } = require("../utils/validation")
const bcrypt = require('bcrypt');

//SignUp API
authRouter.post("/signUp", async (req, res) => {

    try {
        validateSignUpData(req);
        const { firstName, lastName, emailId, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword);
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: hashedPassword
        });
        // if (data?.skills.length > 10) {
        //     throw new Error("Skills can't be more than 10");
        // }
        await user.save();
        res.send("User saved Succesfully")

    } catch (err) {
        res.status(500).send(err.message);

    }
});

//Login API
authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            throw new Error("Invalid Credentials")
        }
        const ValidPassword = await user.validatePassword(password);
        if (ValidPassword) {
            //Create JWT Token
            const token = await user.getJWT();
            res.cookie("token", token, {
                httpOnly: true,
            });

            res.send("Login Successfuly")
        } else {
            throw new Error("Invalid Credentilas");

        }

    } catch (err) {
        res.status(500).send(err.message);
    }
});

//Logout API
authRouter.post("/logout", async (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
        });
        res.send("Logged out Successfully")
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = authRouter;  //export the router to use in other files.  //export
