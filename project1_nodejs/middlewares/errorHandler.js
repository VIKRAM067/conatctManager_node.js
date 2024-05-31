const {constants} = require("../constants")
const errorHandler = (err,req,res,next)=>{
const statusCode = res.statusCode? res.statusCode : 500;

switch (statusCode) {
    case constants.VALIDATION_ERROR:
        res.json({title:"Validation failed",message:err.message,stackTrace: err.stack});
        break;

    case constants.NOT_FOUND:
        res.json({title:"Not found",message:err.message,stackTrace: err.stack});
        break;

    case constants.FORBIDDEN:
        res.json({title:"forbidden",message:err.message,stackTrace: err.stack});
        break;    

    case constants.UNAUTHORIZED:
        res.json({title:"aurhorization error",message:err.message,stackTrace: err.stack});
        break;

    case constants.SERVER_ERROR:
        res.json({title:"Server error",message:err.message,stackTrace: err.stack});
        break;    
    default:
        break;
}
}
 module.exports = errorHandler;

 /* SO this is error handler middleware for handling errors according to the STATUSCODE, 
 This error handler passes to the " sever.js" */