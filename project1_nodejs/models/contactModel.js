// here we are creating a schema for doing CRUD operations from mongoDB


const mongoose =  require("mongoose");

const contactSchema = mongoose.Schema(
    {
/* This is for user to perform CRUD operation for thier contacts, each user has 
   different contacs which is seperated by "userID". 
   so whenever a user create a contact, it creates with the user's userId.*/
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User",
        },
        name:{
            type: String,
            required : [true , "please add the contact name"]
        },
        phone:{
            type: String,
            required : [true,"please add the contact number"]
        },
        email:{
            type:String,
            required : [true,"please add the contact mail"]
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("contacts",contactSchema);