const mongoose = require('mongoose');
const { Schema } = mongoose;

const connectionRequestSchema = new Schema({

    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    Status: {
        type: String,
        required: true,
        enum: {
            values: ['intrested', 'ignored', 'accepted', 'rejected'],
            message: 'status is not valid'
        }
    }
}, {
    timestamps: true
});
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });// compound index



connectionRequestSchema.pre("save", function (next) {
    const connectioRequest = this;
    // check is the fromUserId and toUserId are the Same
    if (connectioRequest.fromUserId.equals(connectioRequest.toUserId)) {
        throw new Error("You can send Connection request to yourSelf")
    }
    next();
})

const Connections = mongoose.model("Connection", connectionRequestSchema);
module.exports = Connections;