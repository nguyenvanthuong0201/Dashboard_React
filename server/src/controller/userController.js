// import { client } from "../config/db.js";
import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
import { User } from "../model/index.js";
import { uploadImageCloud } from "../utils/cloudinary.js";
import { ErrorHandler, ErrorValidation } from "../utils/errorHandler.js";
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
    const { avatar, name, email, workName, password } = req.body;
    try {
        let cloudImage;
        if (avatar != '') {
            cloudImage = await uploadImageCloud(avatar, 'avatar')
        }
        let doc = {
            name,
            email,
            workName,
            password: await bcrypt.hash(password, 10),
            avatar: {
                public_id: cloudImage?.public_id,
                url: cloudImage?.secure_url,
            }
        }
        const _id = (await User.create({ ...doc })).insertedId;
        const user = { ...doc, _id }
        res.status(201).json({
            success: true,
            result: user,
        })
    } catch (error) {
        ErrorValidation(error, req, res, next)
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
        const user = await User.findOne({ email }).select("+password");
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
    req.session.user = {}
    res.status(200).json({ success: true, message: "Logged out" })
})

export const getListUser = catchAsyncErrors(async (req, res, next) => {
    try {
        const users = await User.find({ role: 1 });
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
