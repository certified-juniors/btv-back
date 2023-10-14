import express from 'express'
import { configDotenv } from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import atmsRouter from './app/routes/atms.routes.js';
import officeRouter from './app/routes/offices.routes.js';
import otherRouter from './app/routes/other.routes.js';
import graphhopperRouter from './app/routes/graphhopper.router.js';
import cors from "cors"
import OfficeModel from './app/schemas/offices.schema.js';
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
    app.use("/atm", atmsRouter)
    app.use("/office", officeRouter)
    app.use("/", otherRouter)
    app.use("/", graphhopperRouter)
    // await generateRandomLoad() // Генерация случайной Загруженности
    app.listen(PORT, () => {
        console.log("Running on http://localhost:" + PORT + "/");
    });
}

main()

async function generateRandomLoad() {
    const offices = await OfficeModel.find({});
    offices.forEach(of => {
        OfficeModel.findOneAndUpdate({_id: of._id}, {
            "openHours": (() => {
                const newhours = []
                of["openHours"].forEach(day => {
                    newhours.push({
                        ...day,
                        "averageLoad": (() => {
                            const randomNumbers = [];
                            for (let i = 0; i < 24; i++) {
                                const randomNumber = Math.floor(Math.random() * 101); // Генерируем случайное число от 0 до 100
                                randomNumbers.push(randomNumber); // Добавляем число в массив
                            }
                            return randomNumbers;
                        })()
                    });
                })
                return newhours;
            })(),
            "openHoursIndividual": (() => {
                const newhours = []
                of["openHoursIndividual"].forEach(day => {
                    newhours.push({
                        ...day,
                        "averageLoad": (() => {
                            const randomNumbers = [];
                            for (let i = 0; i < 24; i++) {
                                const randomNumber = Math.floor(Math.random() * 101); // Генерируем случайное число от 0 до 100
                                randomNumbers.push(randomNumber); // Добавляем число в массив
                            }
                            return randomNumbers;
                        })()
                    });
                })
                return newhours;
            })(),
            "currentLoad": Math.floor(Math.random() * 101),
            "currentLoadIndividual": Math.floor(Math.random() * 101),
        }).exec()
    })
}
