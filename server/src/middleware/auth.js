import { ErrorHandler } from "../utils/errorHandler.js";
import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
import jwt from "jsonwebtoken";
import { User } from "../model/index.js";
// import { client } from "../config/db.js";


export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    try {
        const { token } = req.session.user;
        const decodedData = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findOne(decodedData._id);
    } catch (error) {
        return next(new ErrorHandler("Please login to access this resource", 401))
    }
    next();
});

export const authorizeRoles = (...role) => {
    return (req, res, next) => {
        if (!role.includes(req.user.role)) {
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403))
        }
        next();
    }
}