import * as functions from "firebase-functions";
import express from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import {EventModel} from "./Entities/event.model"
import * as fireorm from 'fireorm';
import {getRepository} from "fireorm";
const { v4: uuidv4 } = require('uuid');
const app = express()
app.use(cors({
        origin: '*',
    })
)
app.use(bodyParser.json());

const admin = require('firebase-admin');
admin.initializeApp();
const firestore = admin.firestore();
fireorm.initialize(firestore);






app.get("/alert/create", (async (req, res) => {
    let event = new EventModel()
    console.log(event)
    event.id = uuidv4();
    event.title = "test"
    event.gravity = 1
    const eventRepository = getRepository(EventModel);
    const eventDoc = await eventRepository.create(event).catch(e=>{
        console.log(e)
    });
    console.log(eventDoc)
    const retrieveEvent = await eventRepository.findById(eventDoc!.id);
    console.log(retrieveEvent)
    res.send({
        message: "test"
    })
}))

exports.api = functions.https.onRequest(app)