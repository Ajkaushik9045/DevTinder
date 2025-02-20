const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName: {
        type: String
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "other"].includes(value)) {
                throw new Error("Gender is Not valid");

            }
        }
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // Automatically convert to lowercase
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email");
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Password is not strong");
            }
        }

    },
    skills: {
        type: [String],
    },
    about: {
        type: String,
        default: "This is Default Section of the User"
    }
}, {
    timestamps: true
});

userSchema.methods.validatePassword = async function (passwordInputByuser) {
    const user = this;
    const isPasswordValid = await bcrypt.compare(passwordInputByuser, user.password);
    return isPasswordValid;
};

userSchema.methods.getJWT= async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, "devTinder", { expiresIn: "1h" });
    return token;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
