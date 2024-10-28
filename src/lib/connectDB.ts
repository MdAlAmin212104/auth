import {Db, MongoClient, ServerApiVersion} from 'mongodb'
let db: Db;
export const connect = async () => {
    if(db) return db;

    try {
        const url: string = process.env.NEXT_PUBLIC_MONGODB_URL as string;
        const client = new MongoClient(url, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true, 
            }
        });
        
        await client.connect(); // Connect to MongoDB
        db = client.db('next-project'); // Initialize db with the specific database name
        return db;
    } catch (e) {
        console.error("Error connecting to MongoDB:", e);
    }
}