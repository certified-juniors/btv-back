import { configDotenv } from "dotenv";
import { Router } from "express";

configDotenv()

const KEY = process.env.GRAPHHOPPER_KEY;

const graphhopperRouter = Router();

const API = "https://graphhopper.com/api/1/";

graphhopperRouter.get("/route", async (req, res, next) => {
    const [point1, point2] = req.query.point;
    const query = new URLSearchParams(req.query);
    query.delete("point");
    query.delete("instructions");
    query.delete("key");
    query.append("key", KEY);
    query.append("type", "json");
    const url = `${API}route?point=${point1}&point=${point2}&${query}`;
    fetch(url, {
        method: "GET"
    }).then(async resp => {
        res.send(await resp.json());
    }).catch(e => {
        console.log('e');
        res.send(e);
    })
})


export default graphhopperRouter;