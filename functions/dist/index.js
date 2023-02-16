"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = __importStar(require("firebase-functions"));
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const event_model_1 = require("./Entities/event.model");
const fireorm = __importStar(require("fireorm"));
const fireorm_1 = require("fireorm");
const { v4: uuidv4 } = require('uuid');
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*',
}));
app.use(bodyParser.json());
const admin = require('firebase-admin');
admin.initializeApp();
const firestore = admin.firestore();
fireorm.initialize(firestore);
app.get("/alert/create", (async (req, res) => {
    let event = new event_model_1.EventModel();
    console.log(event);
    event.id = uuidv4();
    event.title = "test";
    event.gravity = 1;
    const eventRepository = (0, fireorm_1.getRepository)(event_model_1.EventModel);
    const eventDoc = await eventRepository.create(event).catch(e => {
        console.log(e);
    });
    console.log(eventDoc);
    const retrieveEvent = await eventRepository.findById(eventDoc.id);
    console.log(retrieveEvent);
    res.send({
        message: "test"
    });
}));
exports.api = functions.https.onRequest(app);
