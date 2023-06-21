import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import UserRoute from "./routes/UserRoute.js";
import db from "./config/Database.js";
import bus from "./models/UserModel.js"; //menambahkan db

dotenv.config();
const app = express();
app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json());
app.use(UserRoute);

try {
    await db.authenticate();
    console.log('Database Tersambung...');
    await bus.sync(); //untuk menambahkan db
} catch (error) {
    console.error(error)
}

app.listen(5000, () => console.log("Server berhasil dijalankan..."));