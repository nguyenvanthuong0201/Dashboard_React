import { MongoClient, ServerApiVersion } from "mongodb";
let DB_URI = "mongodb+srv://nvthuongc15nvtroi:i5LMitbjX4gWUUHG@dashboard.hkmbhsj.mongodb.net/?retryWrites=true&w=majority"
export const client = new MongoClient(DB_URI,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);
