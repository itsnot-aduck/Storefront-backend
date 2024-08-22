import dotenv from "dotenv";
import { Pool } from "pg";

// Get params from dotenv
dotenv.config();

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_HOST,
  NODE_ENV,
  POSTGRES_DB_TEST,
} = process.env;

let client: Pool | null = null;

if (NODE_ENV === "dev") {
  client = new Pool({
    // here the pool is the postgre Database Connection tool
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

export default client;
