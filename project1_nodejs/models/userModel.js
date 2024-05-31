// here we are creating model that is mongo schema for user login and register.

const mongoose = require("mongoose");

const userModel = mongoose.Schema(
    {
        username:{
            type:String,
            required:[true,"please enter the username"],
            unique:[true,"username already taken"],
        },

        password:{
            type:String,
            required:[true,"please enter the password"]
        },

    },
    {
        timestamps:true,
    }
);

module.exports = mongoose.model("User",userModel);