const express = require('express');
const app = express();
const connectDb = require("./config/database");
const User = require("./model/user");
const { validateSignUpData } = require("./utils/validation")
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { userAuth } = require('./middlewares/auth');

app.use(express.json());
app.use(cookieParser());
//sign Api
app.post("/signUp", async (req, res) => {

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
app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            throw new Error("Invalid Credentials")
        }
        const ValidPassword = await bcrypt.compare(password, user.password);
        if (ValidPassword) {
            //Create JWT Token
            const token = jwt.sign({ _id: user._id }, "devTinder", { expiresIn: "1h" });
            res.cookie("token", token, {
                httpOnly: true,
                secure: false, // Set to true in production
                sameSite: "Strict"
            });

            res.send("Login Successfuly")
        } else {
            throw new Error("Invalid Credentilas");

        }

    } catch (err) {
        res.status(500).send(err.message);
    }
})
//Profile API
app.get('/profile', userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(500).send(err.message)
    }
})



connectDb().then(() => {
    console.log("Database is connected");
    app.listen(3000, () => {
        console.log("The server is listening on port 3000");
    });
}).catch((err) => {
    console.error("Database is not connected");
});
