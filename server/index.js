import express from "express";
import * as dotenv from "dotenv";
import cors from "cors"
import calendar from './src/routers/calendarRouter.js';
import user from './src/routers/userRouter.js';
import session from "express-session";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit:"50mb"}))
app.use(session({
    resave: true, 
    saveUninitialized: true, 
    secret: process.env.SESSION_SECRET, 
    cookie: { maxAge: 60000}
}))

app.use("/api/v1",calendar)
app.use("/api/v1",user)

app.get('/',(req,res)=>{
    res.status(200).json({message:"Hello Dev.Thuong"})
})


app.listen(8088, ()=> console.log('Server has started on port 8088'))