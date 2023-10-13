import { Router } from "express";
import ATMModel from "../schemas/atms.schema.js";

const atmsRouter = Router();

atmsRouter.get("/", (req, res, next) => {
    ATMModel.find({}, "address").then(atms => {
        res.send(atms)
    })
})

export default atmsRouter;