import express from "express";
import * as dotenv from "dotenv";
import cors from "cors"
import calendar from './src/routers/calendarRouter.js';
import user from './src/routers/userRouter.js';
import session from "express-session";
import bodyParser from "body-parser";
import cloudinary from "cloudinary";

dotenv.config();
const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}))


app.use("/api/v1", calendar)
app.use("/api/v1", user)

app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello Dev.Thuong" })
})
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


app.listen(8088, () => console.log('Server has started on port 8088'))