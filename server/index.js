import express from "express";
import * as dotenv from "dotenv";
import cors from "cors"
import calendar from './src/routers/calendarRouter.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit:"50mb"}))

app.use("/api/v1",calendar)

app.get('/',(req,res)=>{
    res.status(200).json({message:"Hello Dev.Thuong",db:process.env.DB_URI})
})


app.listen(8080, ()=> console.log('Server has started on port 8080'))