import { Router } from "express";
import OfficeModel from "../schemas/offices.schema.js";

const officeRouter = Router();

officeRouter.get("/", (req, res, next) => {
    OfficeModel.find({}).then(offices => {
        res.send(offices)
    })
})

export default officeRouter;