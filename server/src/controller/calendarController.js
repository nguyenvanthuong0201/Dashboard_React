import { client } from "../config/db.js";

export const getCalendar = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        
    } finally{
        await client.close();
    }
}

export const updateCalendar = async (req, res, next) => {
    try {
        const database = client.db("MyLife");
        const calendar = database.collection("calendar");
        const docs =[
            {
                id: new Date('2023-04-19').getTime(),
                userID:"U"+Date.now(),
                title:"Hợp",
                start:"2023-04-19",
                end:'',
                allDay:true
            },
            {
                id: new Date('2023-04-19').getTime(),
                userID:"U"+Date.now(),
                title:"Hợp",
                start:"2023-04-20",
                end:'',
                allDay:true
            },
        ];
        const options = { ordered: true };
        const query = { userID: { $regex: req.params.id} };
        const deleteOld = await movies.deleteMany(query);
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

