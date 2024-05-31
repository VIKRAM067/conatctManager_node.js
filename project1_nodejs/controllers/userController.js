const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken"); // this is the JWT token package
const User = require("../models/userModel"); // this from the userModel for the schema
const { set } = require("mongoose");
const bcrypt = require('bcryptjs'); // this password hasing bcrypt library

//@desc this gets the user to login
//@route /api/contacts/login
//@access public
const userRegister = asyncHandler( async (req,res)=>{
    const {username , password} = req.body;
    if(!username || !password)
        {
            res.status(400);
            throw new Error("all fields are mandatory");
        }
    const userAvailable = await User.findOne({username});
    if(userAvailable)
        {
            res.status(400);
            throw new Error("username already exists");
        }     
    
    
// here password hashing takes place by "bcrypt" library
    
    const hashedPassword = await bcrypt.hash(password,10); // here, "10" is like rounds for hashing it.
    console.log("hashed password :",hashedPassword);

    const createUser = await User.create(
        {
            username,
            password:hashedPassword,
        }
    );

    if(createUser)
        {
            res.status(201).json({message:"user created",id:createUser.id, username:createUser.username});
        } 
        else{
            res.status(400);
            throw new Error("error occured, user not created. Check the inputs");
        }
});
 

//@desc this gets the user to register
//@route /api/contacts/register
//@access private
const userLogin = asyncHandler( async (req,res)=>{

    const {username , password} = req.body;
    if(!username || !password)
        {
            res.status(400);
            throw new Error("all fields are mandatory");
        }
    const userAvailable = await User.findOne({username});
       
    if(userAvailable && (await bcrypt.compare(password,userAvailable.password)))
        {
            const accessToken = await jwt.sign(  // this JWT has 3 parameters 
                { // this is the 1st parameter in OBJECT form that is payload (info of the user)
                    user:{
                        username:userAvailable.username,
                        id:userAvailable.id,
                    }
                },
                 // this is 2nd parameter that is a secret key
                process.env.SECRET_KEY,
                {
                    // this is the 3rd one , expiration time
                    expiresIn:"15m"
                }    
    
            );

            res.json({accessToken});
        }
        else{
            res.status(401);
            throw new Error("username or password is invalid");
        }
    
});



//@desc this gets the urrent user
//@route /api/contacts/current
//@access private
const userCurrent = asyncHandler( async (req,res)=>{
    res.json(req.user);
});

module.exports = {userCurrent,userLogin,userRegister};