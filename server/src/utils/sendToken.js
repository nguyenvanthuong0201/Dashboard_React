import jwt from "jsonwebtoken";

export const sendToken = (user, statusCode, req, res) => {
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES
    })
    req.session.User = {token}
    res.status(statusCode).json({
        success:true,
        user,
        token
    })
}
