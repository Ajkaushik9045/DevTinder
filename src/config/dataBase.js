const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://brandbridge45:34@98Zftc6rQLnH@cluster0.l5nwadx.mongodb.net/devTinder"
  );
  
};



module.exports = connectDb;
