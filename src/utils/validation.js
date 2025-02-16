const validator = require("validator");

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error("Name is not Valid");
    } if (!emailId) {
        throw new Error("Email is required");
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not Valid");
    }
    if (!password) {
        throw new Error("Password is required");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not Strong ");
    }
};
module.exports = {
    validateSignUpData
}