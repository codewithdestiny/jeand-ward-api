import { createClient } from "redis";
require("dotenv").config();

export const REDIS_URL = "redis://locahost:6379" || process.env.REDIS_URL;

export const client = createClient();

