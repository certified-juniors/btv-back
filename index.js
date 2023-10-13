import express from 'express'
import { configDotenv } from 'dotenv';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import atmsRouter from './app/routes/atms.routes.js';
import officeRouter from './app/routes/offices.routes.js';
configDotenv();

const PORT = process.env.EXPRESS_PORT || 5000;

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.set("strictQuery", false);

const db_url = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.DOCKERIZED == 1 ? 'mongo' : 'localhost'}:${process.env.MONGO_PORT}/vtb?directConnection=true&authSource=admin`;

async function main() {
    await mongoose.connect(db_url);
    app.use("/atms", atmsRouter)
    app.use("/offices", officeRouter)
    app.listen(PORT, () => {
        console.log("Running on http://localhost:" + PORT + "/");
    });
}

main().catch(err => console.error(err))


