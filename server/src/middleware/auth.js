import {ErrorHandler}  from "../utils/errorHandler.js";
import {catchAsyncErrors}  from "../middleware/catchAsyncError.js";
import jwt from "jsonwebtoken";
import { client } from "../config/db.js";


export const isAuthenticatedUser  = catchAsyncErrors(async(req,res,next)=>{
    const {token} = req.session.User;
    if(!token){
        return next( new ErrorHandler("Please login to access this resource",401))
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET)
    await client.connect();
    const database = client.db("MyLife");
    const calendar = database.collection("calendar");
    req.user= await calendar.findOne(decodedData._id);
    next();
});

export const authorizeRoles = (...role)=>{
    return (req,res,next)=>{
        if(!role.includes(req.user.role)){
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`,403))
        }
        next();
    }
}