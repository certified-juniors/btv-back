import { Router } from "express";
import ATMModel from "../schemas/atms.schema.js";
import OfficeModel from "../schemas/offices.schema.js";

const otherRouter = Router();

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

export default otherRouter;