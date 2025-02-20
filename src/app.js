const express = require('express');
const app = express();
const connectDb = require("./config/database");
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

// importing Routers 
const authRouter= require("./routes/auth");
const profileRouter= require("./routes/profile");
const requestRouter= require("./routes/request");

// using Routers
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

// connecting to database and running Server
connectDb().then(() => {
    console.log("Database is connected");
    app.listen(3000, () => {
        console.log("The server is listening on port 3000");
    });
}).catch((err) => {
    console.error("Database is not connected");
});
