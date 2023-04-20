import { client } from "../config/db.js";
import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { sendToken } from "../utils/sendToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please enter name & Email & Password", 400))
    }
    try {
        await client.connect();
        const database = client.db("MyLife");
        const calendar = database.collection("calendar");
        let doc = {
            userID:"U"+Date.now(),
            name,
            email,
            password,
        }
        const _id = (await calendar.insertOne({doc})).insertedId;
        const user = {...doc,_id}
        sendToken(user, 200, req, res);
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        });
    } finally{
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
        const calendar = database.collection("calendar");
        const user = await calendar.findOne({email});
        const isPasswordMatched  = await bcrypt.compare(password, user?.password)
        if(!user || !isPasswordMatched){
            return next(new ErrorHandler("Invalid email orr password",401))
        }
        sendToken(user, 200,req, res);
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        });
    } finally{
        await client.close();
    }
})


export const logout =catchAsyncErrors(async (req, res, next) => {
        req.session.User = {}
        res.status(200).json({ success: true, message: "Logged out" })
    }
)
