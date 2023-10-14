import { Router } from "express";
import ATMModel from "../schemas/atms.schema.js";
import OfficeModel from "../schemas/offices.schema.js";
import { configDotenv } from "dotenv";

configDotenv()

const otherRouter = Router();

const KEY = process.env.GRAPHHOPPER_KEY;

const API = "https://graphhopper.com/api/1/";

otherRouter.get("/by_region", async (req, res, next) => {
    const nelongitude = +req.query["ne-longitude"];
    const nelatitude = +req.query["ne-latitude"];
    const swlongitude = +req.query["sw-longitude"];
    const swlatitude = +req.query["sw-latitude"];
    const atms_promise = ATMModel.find({}, ["latitude", "longitude"]).$where(`this.latitude <= ${nelatitude} && this.latitude >= ${swlatitude} && this.longitude <= ${nelongitude} && this.longitude >= ${swlongitude}`);
    const office_promise = OfficeModel.find({}, ["latitude", "longitude"]).$where(`this.latitude <= ${nelatitude} && this.latitude >= ${swlatitude} && this.longitude <= ${nelongitude} && this.longitude >= ${swlongitude}`);

    res.send({
        atms: await atms_promise,
        offices: await office_promise
    })
})

otherRouter.get("/closest", async (req, res, next) => {
    let {
        search_for,
        max_results,
        vehicle,
        longitude,
        latitude,
        individual
    } = req.query;
    search_for = search_for ?? "all";
    max_results = max_results ?? 3;
    max_results = +max_results;
    vehicle = vehicle ?? "foot";
    individual = individual ?? 1;
    if (!longitude || !latitude) {
        return res.status(400).send({
            "error": "longitude and/or latitude are not presented"
        })
    }
    let search_distance = 0;
    const found_atms = [];
    const found_offices = [];
    const while_condition = (() => {
        switch (search_for) {
            case "offices":
                return () => found_offices.length < 1;
            case "atms":
                return () => found_atms.length < 1;
            case "all":
            default:
                return () => found_atms.length + found_offices.length < 1;
        }
    })();
    while (while_condition()) {
        search_distance += 100;
        const [topRight, bottomLeft] = calculateSquareVertices(search_distance, latitude, longitude);
        const atms_promise = ATMModel.find({})
            .$where(`this.latitude <= ${topRight.latitude} && this.latitude >= ${bottomLeft.latitude} && this.longitude <= ${topRight.longitude} && this.longitude >= ${bottomLeft.longitude}`);
        const office_promise = OfficeModel.find({})
            .$where(`this.latitude <= ${topRight.latitude} && this.latitude >= ${bottomLeft.latitude} && this.longitude <= ${topRight.longitude} && this.longitude >= ${bottomLeft.longitude}`);
        const atms = await atms_promise;
        const offices = await office_promise;
        found_atms.push(...atms);
        found_offices.push(...offices);
    }
    const point1 = latitude.toString() + "," + longitude.toString();

    async function fetchTimeToArrive(point1, point2, vehicle) {
        const query = new URLSearchParams({
            key: KEY,
            type: "json",
            vehicle,
        });
        const url = `${API}route?point=${point1}&point=${point2}&${query}`;
        const response = await fetch(url, {
            method: "GET"
        });
        const route = await response.json();
        return route?.paths ? route.paths.sort((a, b) => a.time - b.time)[0].time : 10000000000;
    }
    
    function calculateTimeInWait(load, individual) {
        const x = individual ? load.currentLoadIndividual : load.currentLoad;
        return (0.003 * (x ** 2) + 0.15 * x) * 60 * 1000;
    }

    const response = {
        total: 0
    }
    
    if (search_for === "all" || search_for === "atms") {
        response.atms = [];
        for (let atm of found_atms) {
            const point2 = `${atm.latitude},${atm.longitude}`;
            const timeToArrive = await fetchTimeToArrive(point1, point2, vehicle);
            response.atms.push({
                atm: atm.toObject(),
                timeToArrive,
            })
            response.total += 1;
        }
        response.atms = response.atms.sort((a, b) => a.timeInWait + a.timeToArrive - b.timeInWait - b.timeToArrive)
        response.atms = response.atms.slice(0, max_results)
    }
    
    if (search_for === "all" || search_for === "offices") {
        response.offices = [];
        for (let office of found_offices) {
            const point2 = `${office.latitude},${office.longitude}`;
            const timeToArrive =  await fetchTimeToArrive(point1, point2, vehicle);
            const timeInWait = calculateTimeInWait(office, individual);
            response.offices.push({
                office: office.toObject(),
                timeInWait,
                timeToArrive
            })
            response.total += 1;
        }
        response.offices = response.offices.sort((a, b) => a.timeInWait + a.timeToArrive - b.timeInWait - b.timeToArrive)
        response.atms = response.atms.slice(0, max_results)
    }

    response.total = response.atms.length + response.offices.length;
    res.send(response);
})

function calculateSquareVertices(side, latitude, longitude) {
    latitude = +latitude;
    longitude = +longitude;
    // Радиус Земли в метрах
    const earthRadius = 6371000;

    // Расчет разницы широты и долготы на основе стороны квадрата
    const deltaLatitude = (side / (2 * earthRadius)) * (180 / Math.PI);
    const deltaLongitude = (side / (2 * earthRadius)) * (180 / Math.PI) / Math.cos(latitude * (Math.PI / 180));

    // Вычисление координат верхнего левого и нижнего правого углов квадрата
    const topRight = {
        latitude: latitude + deltaLatitude,
        longitude: longitude + deltaLongitude
    };
    const bottomLeft = {
        latitude: latitude - deltaLatitude,
        longitude: longitude - deltaLongitude
    };

    return [topRight, bottomLeft];
}

export default otherRouter;