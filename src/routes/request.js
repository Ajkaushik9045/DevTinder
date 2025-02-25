const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const Connections = require('../model/connectioRequest');
const User= require('../model/user');


//sendConnectionRequest API
requestRouter.post('/request/send/:status/:userId', userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.userId;
        const Status = req.params.status;
        
        //validatinng there is only Valid Status 
        const allowedStatus= ["ignored","intrested"];
        if(!allowedStatus.includes(Status)){
            return res.status(400).json({ message: "Invalid status" });
        }

        //checking that if the toUserId is if Exist in our Db or not 
        const isToUserInDb= await User.findOne({_id:toUserId});
        if(!isToUserInDb){
            return res.status(400).json({ message: "User not found" });
        }

        //If there is any Existing Connection request
        const existingRequest= await Connections.findOne({
            $or:[
                {toUserId,fromUserId},
                {fromUserId:toUserId, toUserId:fromUserId}
            ]
        });
        if(existingRequest){
            throw new Error("Connection request already exist");
        }

        //Creating the Instance of Connection Request model 
        const ConnectionRequest = new Connections({
            fromUserId,
            toUserId,
            Status
        });
        //saving the data inside the Connection Request model
        const data = await ConnectionRequest.save();

        res.json({
            message: 'Connection Request Sent',
            data
        })

    } catch (error) {
        res.status(500).send(error.message)
    }
});

module.exports = requestRouter;   //export the router to use in other files.  //export
