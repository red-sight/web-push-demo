import dotenv from "dotenv";
import { join } from "path";
dotenv.config({ path: join(process.env.PROJECT_CWD!, ".env") });
import { Config } from "./Config";

export const config = new Config().config;

export * from "./config.types";
