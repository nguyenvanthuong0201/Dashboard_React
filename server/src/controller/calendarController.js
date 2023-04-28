import { Calendar } from "../model/index.js";

export const getCalendar = async (req, res, next) => {
    try {
        const query = { "userID": req.params.id };
        const result = await Calendar.find(query).toArray();
        res.status(200).json({
            result,
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        });
    }
}

export const updateCalendar = async (req, res, next) => {
    try {
        const docs = req.body.data
        const options = { ordered: true };
        const query = { userID: { $regex: req.params.id } };
        await Calendar.deleteMany(query);
        const result = await Calendar.insertMany(docs, options);
        res.status(200).json({
            success: true,
            result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        });
    } finally {
        await client.close();
    }
}

