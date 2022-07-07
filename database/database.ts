import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;
let configDatabase: any;

if(process.env.MODE === "PROD") {
    configDatabase = {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    };
} else {
    configDatabase = {
        connectionString: process.env.DATABASE_URL
    }
}

const db = new Pool(configDatabase);
export default db;