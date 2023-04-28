import mongoose from 'mongoose';

export const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    mongoose.connection.on("connected", () => {
        console.log("Connected MongoDB Atlas");
    });
    mongoose.connection.off("error", () => {
        console.log("Don't connect MongoDB Atlas");
    })
};
