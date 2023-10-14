import { Router } from "express";
import ATMModel from "../schemas/atms.schema.js";

const atmsRouter = Router();

atmsRouter.get("/all", (req, res, next) => {
    ATMModel.find({}).then(atms => {
        res.send(atms)
    })
})

atmsRouter.get('/:id', (req, res, next) => {
    const atm_id = req.params.id;
    ATMModel.findOne({_id: atm_id}).then(atm => {
        res.send(atm)
    })
})

export default atmsRouter;