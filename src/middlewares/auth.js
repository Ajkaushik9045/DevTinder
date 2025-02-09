const adminAuth= (req, res, next) => {
    const token = "XYZ";
    const isAuthencatedUser = token == "XYZ";
    if (!isAuthencatedUser) {
        res.status(401).send("Unauthorised access");
    } else {
        next();
    }
};

const userAuth= (req,res)=>{{
    const token ="XRSw";
    const isAuthencatedUser= token== "XRS";
    if(!isAuthencatedUser){
        res.status(401).send("Unauthorised User");
    } else{
        res.send("Usser is Auuthenticated");
    }
}}
module.exports= {adminAuth, userAuth};