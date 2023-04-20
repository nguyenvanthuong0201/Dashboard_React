import { ObjectId } from "mongodb";
import { client } from "../config/db.js";

export const getCalendar = async (req, res, next) => {
    try {
        await client.connect();
        const database = client.db("MyLife");
        const calendar = database.collection("calendar");
        const query = {"userID": req.params.id};
        const result = await calendar.find(query).toArray();
        res.status(200).json({
            result,
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        });
    } finally{
        await client.close();
    }
}

export const updateCalendar = async (req, res, next) => {
    try {
        await client.connect();
        const database = client.db("MyLife");
        const calendar = database.collection("calendar");
        const docs =[
            {
                id: new Date('2023-04-19').getTime(),
                userID:"U"+Date.now(),
                title:"HỌP",
                start:"2023-04-19",
                end:'',
                allDay:true
            },
            {
                id: new Date('2023-04-19').getTime(),
                userID:"U"+Date.now(),
                title:"Đi nhậu",
                start:"2023-04-20",
                end:'',
                allDay:true
            },
        ];
        const options = { ordered: true };
        const query = { userID: { $regex: req.params.id} };
        await calendar.deleteMany(query);
        const result = await calendar.insertMany(docs,options);
        res.status(200).json({
            success: true,
            result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        });
    } finally{
        await client.close();
    }
}

