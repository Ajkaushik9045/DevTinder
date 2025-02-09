const express = require('express');
const app = express();
const connectDb = require("./config/database");
const User = require("./model/user");


app.use(express.json());


app.post("/signUp", async (req, res) => {
    const data = req.body;
    // console.log(data);
    const user = new User(data);
    try {
        if (data?.skills.length > 10) {
            throw new Error("Skills can't be more than 10");
        }
        await user.save();
        res.send("User saved Succesfully")

    } catch (err) {
        res.status(500).send(err.message);

    }
});
//get API to fetch data of user by there emailId
app.get("/user", async (req, res) => {
    const userMail = req.body.emailId;
    try {
        //.find function return array of the user found with matching emails
        const foundUser = await User.find({ emailId: userMail });


        //.findOne function return us a single object not an array with matching emailId
        // const foundedUser= await User.findOne({emailId:userMail});
        // if(foundedUser){
        //     res.send(foundedUser);
        // }else{
        //     res.send("user not found");
        // }


        if (foundUser === 0) {
            res.send("User not found");

        } else {
            res.send(foundUser)

        }

    } catch (err) {
        res.status(500).send("Something Went wrong");
    }
})
//get API for fetching all the user stroed in database
app.get("/feed", async (req, res) => {
    const users = await User.find({});// {} is a empty object which means "find all the data "
    try {
        res.send(users);
    } catch (err) {
        res.status(500).send("Somethinh Went Worng")
    }
})
//.delete API to dleete the user form databse
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        res.send("user deleetd Successfuly")
    } catch (err) {
        res.status(500).send("User not deleted Succesfully")
    }
})
//.patch API to update the user data
app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    try {
        const ALLOWED_UPDATE = ["age", "gender", "about", "skills"];
        const isAlloweUpdate = Object.keys(data).every((k) => ALLOWED_UPDATE.includes(k));
        if (!isAlloweUpdate) {
            throw new Error("Update is not Allowed");
        }
        if (data?.skills.length > 10) {
            throw new Error("Skills can't be more than 10");
        }
        await User.findByIdAndUpdate(userId, { firstName: "vijay" });

        res.send("user updated Succesfully")
    } catch (error) {
        res.status(500).send("User not updated Succesfully")
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
