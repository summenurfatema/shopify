import * as dotenv from "dotenv";
dotenv.config();

export const corsOptions = [
  "http://localhost:5000",
  "http://localhost:4000",
  "localhost:5000",
  "https://www.localhost:5000",
  "http://localhost:5000/*",
  "http://localhost:5000/",
];
