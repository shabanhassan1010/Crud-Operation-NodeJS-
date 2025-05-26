const mongoose = require("mongoose");

const userSchema= new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        minlength: [3, "Username must be at least 3 characters"],
        maxlength: [30, "Username cannot exceed 30 characters"]
    },
    email :{
        type : String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
    },
    password :{
        type : String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
        select: false
    },
    isConfirmed :{
        type : Boolean,
        default : false
    },
    createdAt: {
        type: Date,
        default: Date.now
  }
})

const userModel = mongoose.model('User' , userSchema)
module.exports = userModel;
