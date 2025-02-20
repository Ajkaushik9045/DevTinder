const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require('../middlewares/auth');


//sendConnectionRequest API
requestRouter.post('/sendConnectionRequest', userAuth, async (req, res) => {
    try {
        res.send("Sending Coonection request")
    } catch (error) {
        res.status(500).send(error.message)
    }
});

module.exports = requestRouter;   //export the router to use in other files.  //export
