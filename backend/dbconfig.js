import { MongoClient } from "mongodb";

const url = "mongodb+srv://abdurrehmanptf786_db_user:Lwqt3OKo1qKwR19Q@cluster0.dlavmed.mongodb.net/?retryWrites=true&w=majority";
const dbName = "node-project";
export const collectionName = "todo";

const client = new MongoClient(url);

export const connection = async () => {
    const connect = await client.connect();
    return connect.db(dbName);
};
