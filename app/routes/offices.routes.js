import { Router } from "express";
import OfficeModel from "../schemas/offices.schema.js";

const officeRouter = Router();

officeRouter.get("/all", (req, res, next) => {
    OfficeModel.find({}).then(offices => {
        res.send(offices)
    })
})

officeRouter.get('/:id', (req, res, next) => {
    const office_id = req.params.id;
    OfficeModel.findOne({_id: office_id}).then(atm => {
        res.send(atm)
    })
})

export default officeRouter;