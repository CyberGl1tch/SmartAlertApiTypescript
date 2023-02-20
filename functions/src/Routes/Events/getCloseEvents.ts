import {getRepository} from "fireorm";
import {EventModel} from "../../Entities/event.model";
import {UserModel} from "../../Entities/user.model";
import {Roles} from "../../Enums/Role.enum";
import {getDistanceFromLatLonInKm} from "../../Utils/MathUtils";

export async function getCloseEvent(req: any, res: any) {
    let maxDistance = req.query.maxDistance ? req.query.maxDistance : 1
    let longitude = req.query.longitude
    let latitude = req.query.latitude
    let decodedUser = req.user

    if(!longitude || !latitude) return res.status(409).json({status: 409,message: "Missing core values"})


    const eventRepository = getRepository(EventModel);
    let events = await eventRepository.find()

    events = events.filter(event =>{
        if(getDistanceFromLatLonInKm(latitude,longitude,event.latitude,event.longitude) <= maxDistance && event.userId !== decodedUser.user_id){
            return event
        }
    })

    res.send(events)



}