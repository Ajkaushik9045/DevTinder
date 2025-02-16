const mongoose = require('mongoose');

const uri="mongodb+srv://brandbridge45:Anuj123@cluster0.l5nwadx.mongodb.net/DevTinder"
const connectDb = async () => {
    await mongoose.connect(uri);
};

module.exports= connectDb;
