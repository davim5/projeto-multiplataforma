import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/userRoutes.js";
import petRoute from "./routes/petsRoutes.js"
import walkerRoute from "./routes/walkersRoutes.js"
import walkRoute from "./routes/walkRoutes.js"


const app = express();
app.use(express.json());
app.use(cors());

dotenv.config({ path: './src/.env' })

const PORT = process.env.PORT || 3333;
const MONGO_URL = process.env.MONGO_URL;

mongoose
.connect(MONGO_URL)
.then(() => { 
    console.log("DB conectado!")
    app.listen(PORT, () => {
        console.log(`Server rodando na porta: ${PORT}`);
    })
})
.catch((error) => console.log(error));

app.use("/api", userRoute, petRoute, walkRoute, walkerRoute);