const asyncHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");

const validationToken = asyncHandler( async (req,res,next)=>{
    
    let token;
    let authHeader= req.headers.Authorization || req.headers.authorization ;
    if(authHeader && authHeader.startsWith("Bearer"))
        {
            token = authHeader.split(" ")[1];

            if(!token){
                res.status(401);
                throw new Error("Token is missing");
            }

            /* here "jwt.verify" has 3 params they are "token that is generated","secret key " 
            And "call back func( err{verify fails} , decoded{information of the user after decoded} )
            - that is what to do next after checking"*/

            jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
                if(err)
                    {
                        res.status(401);
                        throw new Error("authorization failed, Token expired");
                    }
                    console.log(decoded);
                req.user = decoded.user;
                console.log(req.user);
                next();    
            });
        }
});

module.exports = validationToken;