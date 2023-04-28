// import { client } from "../config/db.js";
import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
import { User } from "../model/index.js";
import { uploadImageCloud } from "../utils/cloudinary.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { sendToken } from "../utils/sendToken.js";
import bcrypt from 'bcryptjs';

export const checkAuth = catchAsyncErrors(async (req, res, next) => {
    if (!req.user) {
        return next(new ErrorHandler("authenticated false", 400))
    }
    delete req.user.password;
    res.status(200).json({
        success: true,
        result: req.user,
    })
})

export const register = catchAsyncErrors(async (req, res, next) => {
    try {
        let doc = {
            name,
            email,
            work_name,
            password: await bcrypt.hash(password, 10),
        }
        const _id = (await User.insertOne({ ...doc })).insertedId;
        const user = { ...doc, _id }
        sendToken(user, 200, req, res);
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        });
    }
})

export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email) {
        return next(new ErrorHandler("Please enter your email", 400))
    }
    if (!password) {
        return next(new ErrorHandler("Please enter your password", 400))
    }
    try {

        const user = await User.findOne({ email });
        const isPasswordMatched = await bcrypt.compare(password, user?.password)
        if (!user || !isPasswordMatched) {
            return next(new ErrorHandler("Invalid email or password", 401))
        }
        sendToken(user, 200, req, res);
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        });
    }
})

export const logout = catchAsyncErrors(async (req, res, next) => {
    req.session.User = {}
    res.status(200).json({ success: true, message: "Logged out" })
})

export const getListUser = catchAsyncErrors(async (req, res, next) => {
    try {
        const users = await User.find({ role: 1 }).toArray();
        res.status(200).json({
            success: true,
            result: users,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        });
    }
})
