const jwt = require("jsonwebtoken");
const User = require("../model/user");

const userAuth = async (req, res , next) => {
    try {
        const token = req.cookies?.token; 
        if(!token){
            throw new Error("Please Login First");
        }
        const decode= jwt.verify(token,"devTinder");
        const {_id}= decode;
        const user = await User.findById(_id);
        if(!user){
            throw new Error("User not found");
        }
        req.user= user;
        next();
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
module.exports = { userAuth };