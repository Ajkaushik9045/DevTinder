const mongoose = require('mongoose');


const connectDb = async () => {
    await mongoose.connect(uri);
};

module.exports= connectDb;
