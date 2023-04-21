import {ErrorHandler}  from "../utils/errorHandler.js";
import {catchAsyncErrors}  from "../middleware/catchAsyncError.js";
import jwt from "jsonwebtoken";
import { client } from "../config/db.js";


export const isAuthenticatedUser  = catchAsyncErrors(async(req,res,next)=>{
    if(!req.session.User){
        return next( new ErrorHandler("Please login to access this resource",401))
    }
    const {token} = req.session.User;
    const decodedData = jwt.verify(token, process.env.JWT_SECRET)
    try {
        await client.connect();
        const database = client.db("MyLife");
        const calendar = database.collection("user");
        req.user= await calendar.findOne(decodedData._id);
    } catch (error) {
        console.log("Please login to access this resource")
    } finally {
        await client.close();
        next();
    }
});

export const authorizeRoles = (...role)=>{
    return (req,res,next)=>{
        if(!role.includes(req.user.role)){
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`,403))
        }
        next();
    }
}