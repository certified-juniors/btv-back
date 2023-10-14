import express from 'express'
import { configDotenv } from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import atmsRouter from './app/routes/atms.routes.js';
import officeRouter from './app/routes/offices.routes.js';
import otherRouter from './app/routes/other.routes.js';
import graphhopperRouter from './app/routes/graphhopper.router.js';
import cors from "cors"
configDotenv();

const PORT = process.env.EXPRESS_PORT || 5000;

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(cors({
    origin: "*"
}))
mongoose.set("strictQuery", false);

const db_url = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.DOCKERIZED == 1 ? 'mongo' : 'localhost'}:${process.env.MONGO_PORT}/vtb?directConnection=true&authSource=admin`;

async function main() {
    await mongoose.connect(db_url);
    app.use("/atms", atmsRouter)
    app.use("/offices", officeRouter)
    app.use("/", otherRouter)
    app.use("/", graphhopperRouter)
    app.listen(PORT, () => {
        console.log("Running on http://localhost:" + PORT + "/");
    });
}

main()


