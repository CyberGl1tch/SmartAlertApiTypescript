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
const fireorm = __importStar(require("fireorm"));
const createUser_1 = require("./Routes/Users/createUser");
const validateUser_1 = require("./Middleware/validateUser");
const updateUser_1 = require("./Routes/Users/updateUser");
const getUserInfo_1 = require("./Routes/Users/getUserInfo");
const createEvent_1 = require("./Routes/Events/createEvent");
const updateEvent_1 = require("./Routes/Events/updateEvent");
const approveEvent_1 = require("./Routes/Events/approveEvent");
const rejectEvent_1 = require("./Routes/Events/rejectEvent");
const getCloseEvents_1 = require("./Routes/Events/getCloseEvents");
const getEvents_1 = require("./Routes/Events/getEvents");
const voteEvent_1 = require("./Routes/Events/voteEvent");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*',
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const admin = require('firebase-admin');
admin.initializeApp();
const firestore = admin.firestore();
const auth = admin.auth();
fireorm.initialize(firestore);
//Validation Auth
app.use(validateUser_1.validateUserMiddle);
//User
app.post("/users", createUser_1.createUser);
app.patch("/users", updateUser_1.updateUser);
app.get("/users", getUserInfo_1.getUserInfo);
//Events
app.get("/events", getEvents_1.getEvents);
app.get("/events/:id/vote", voteEvent_1.voteEvent);
app.post("/events", createEvent_1.createEvent);
app.post("/events/:id", updateEvent_1.updateEvent);
app.get("/events/:id/approve", approveEvent_1.approveEvent);
app.delete("/events/:id", rejectEvent_1.rejectOrDeleteEvent);
app.get("/events/close", getCloseEvents_1.getCloseEvent);
exports.api = functions.https.onRequest(app);
