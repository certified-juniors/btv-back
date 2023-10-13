import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ATMModelSchema = new Schema({
  "address": String,
  "latitude": Number,
  "longitude": Number,
  "allDay": Boolean,
  "services": {
    "wheelchair": {
        "serviceCapability": {
            type: String,
            enum: ["UNKNOWN", "SUPPORTED", "UNSUPPORTED"],
        },
        "serviceActivity": {
            type: String,
            enum: ["UNKNOWN", "AVAILABLE", "UNAVAILABLE"],
        },
    },
    "blind": {
        "serviceCapability": {
            type: String,
            enum: ["UNKNOWN", "SUPPORTED", "UNSUPPORTED"],
        },
        "serviceActivity": {
            type: String,
            enum: ["UNKNOWN", "AVAILABLE", "UNAVAILABLE"],
        },
    },
    "nfcForBankCards": {
        "serviceCapability": {
            type: String,
            enum: ["UNKNOWN", "SUPPORTED", "UNSUPPORTED"],
        },
        "serviceActivity": {
            type: String,
            enum: ["UNKNOWN", "AVAILABLE", "UNAVAILABLE"],
        },
    },
    "qrRead": {
        "serviceCapability": {
            type: String,
            enum: ["UNKNOWN", "SUPPORTED", "UNSUPPORTED"],
        },
        "serviceActivity": {
            type: String,
            enum: ["UNKNOWN", "AVAILABLE", "UNAVAILABLE"],
        },
    },
    "supportsUsd": {
        "serviceCapability": {
            type: String,
            enum: ["UNKNOWN", "SUPPORTED", "UNSUPPORTED"],
        },
        "serviceActivity": {
            type: String,
            enum: ["UNKNOWN", "AVAILABLE", "UNAVAILABLE"],
        },
    },
    "supportsChargeRub": {
        "serviceCapability": {
            type: String,
            enum: ["UNKNOWN", "SUPPORTED", "UNSUPPORTED"],
        },
        "serviceActivity": {
            type: String,
            enum: ["UNKNOWN", "AVAILABLE", "UNAVAILABLE"],
        },
    },
    "supportsEur": {
        "serviceCapability": {
            type: String,
            enum: ["UNKNOWN", "SUPPORTED", "UNSUPPORTED"],
        },
        "serviceActivity": {
            type: String,
            enum: ["UNKNOWN", "AVAILABLE", "UNAVAILABLE"],
        },
    },
    "supportsRub": {
        "serviceCapability": {
            type: String,
            enum: ["UNKNOWN", "SUPPORTED", "UNSUPPORTED"],
        },
        "serviceActivity": {
            type: String,
            enum: ["UNKNOWN", "AVAILABLE", "UNAVAILABLE"],
        },
    },
  }
});

// Compile model from schema
const ATMModel = mongoose.model("atms", ATMModelSchema);

export default ATMModel;