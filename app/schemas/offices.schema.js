import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OfficeModelSchema = new Schema({
    "salePointName": String,
    "address": String,
    "status": String,
    "openHours": [{
        "days": String,
        "hours": String,
        "averageLoad": [Number],
    }],
    "openHoursIndividual": [{
        "days": String,
        "hours": String,
        "averageLoad": [Number],
    }],
    "currentLoad": Number,
    "currentLoadIndividual": Number,
    "officeType": String,
    "salePointFormat": String,
    "suoAvailability": {
        type: String,
        enum: [null, "Y", "N"],
    },
    "hasRamp": {
        type: String,
        enum: [null, "Y", "N"],
    },
    "latitude": Number,
    "longitude": Number,
    "metroStation": String,
    "distance": Number,
    "kep": Boolean,
    "myBranch": Boolean,
});

// Compile model from schema
const OfficeModel = mongoose.model("offices", OfficeModelSchema);

export default OfficeModel;