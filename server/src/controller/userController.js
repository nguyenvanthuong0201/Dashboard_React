import { client } from "../config/db.js";
import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
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
    const { name, email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please enter name & Email & Password", 400))
    }
    try {
        await client.connect();
        const database = client.db("MyLife");
        const users = database.collection("user");
        users.createIndex({ email: 1 }, { unique: true })
            .catch(error => next(new ErrorHandler("Email duplicate ", 400)))
        let doc = {
            userID: "U" + Date.now(),
            name,
            email,
            password: await bcrypt.hash(password, 10),
            role: 0
        }
        const _id = (await users.insertOne({ ...doc })).insertedId;
        const user = { ...doc, _id }
        sendToken(user, 200, req, res);
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        });
    } finally {
        await client.close();
    }
})

export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please enter Email & Password", 400))
    }
    try {
        await client.connect();
        const database = client.db("MyLife");
        const users = database.collection("user");
        const user = await users.findOne({ email });
        const isPasswordMatched = await bcrypt.compare(password, user?.password)
        if (!user || !isPasswordMatched) {
            return next(new ErrorHandler("Invalid email orr password", 401))
        }
        sendToken(user, 200, req, res);
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        });
    } finally {
        await client.close();
    }
})


export const logout = catchAsyncErrors(async (req, res, next) => {
    req.session.User = {}
    res.status(200).json({ success: true, message: "Logged out" })
}
)
