import dotenv from "dotenv";

dotenv.config();

export const MONGO_URL = process.env.MONGO_URL ?? "abc";
export const DB_NAME = process.env.DB_NAME ?? "abc";
export const DB_USERNAME = process.env.DB_USERNAME ?? "abc";
export const DB_PASSWORD = process.env.DB_PASSWORD ?? "abc";