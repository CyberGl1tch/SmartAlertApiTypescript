import * as functions from "firebase-functions";
import express from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import * as fireorm from 'fireorm';
import {createUser} from "./Routes/Users/createUser";
import {validateUserMiddle} from "./Middleware/validateUser";
import {updateUser} from "./Routes/Users/updateUser";
import {getUserInfo} from "./Routes/Users/getUserInfo";
import {createEvent} from "./Routes/Events/createEvent";
import {updateEvent} from "./Routes/Events/updateEvent";
import {approveEvent} from "./Routes/Events/approveEvent";
import {rejectOrDeleteEvent} from "./Routes/Events/rejectEvent";
import {getCloseEvent} from "./Routes/Events/getCloseEvents";
import {getEvents} from "./Routes/Events/getEvents";
import {voteEvent} from "./Routes/Events/voteEvent";
import {notifyTest} from "./Routes/Events/notificationTest";
const app = express()
app.use(cors({
        origin: '*',
    })
)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const admin = require('firebase-admin');
admin.initializeApp();
const firestore = admin.firestore();
const auth = admin.auth()
const messaging = admin.messaging()
fireorm.initialize(firestore);


//Validation Auth
app.use(validateUserMiddle)

//User
app.get("/testNotification",notifyTest)
app.post("/users",createUser)
app.patch("/users",updateUser)
app.get("/users",getUserInfo)

//Events
app.get("/events",getEvents)
app.get("/events/:id/vote",voteEvent)
app.post("/events",createEvent)
app.post("/events/:id",updateEvent)
app.get("/events/:id/approve",approveEvent)
app.delete("/events/:id",rejectOrDeleteEvent)
app.get("/events/close",getCloseEvent)


exports.api = functions.https.onRequest(app)