import {getRepository} from "fireorm";
import {UserModel} from "../../Entities/user.model";
import {Roles} from "../../Enums/Role.enum";
import {EventModel} from "../../Entities/event.model";
import { v4 as uuidv4 } from 'uuid';
import {DateTime} from "luxon";

export async function createEvent(req: any, res: any) {
    const body: any = req.body
    if(!body.title || !body.gravity || !body.longitude || !body.latitude) return res.status(409).json({status: 409,message: "Missing core values"})
    let decodedUser = req.user

    const eventRepository = getRepository(EventModel);

    let event = new EventModel()
    event.id = uuidv4()
    event.userId = decodedUser.user_id
    event.gravity = body.gravity
    event.latitude = body.latitude
    event.longitude = body.longitude
    event.title = body.title
    event.description = body.description ? body.description : ""
    event.approvedByUserId = null
    event.votedByUsers = []
    event.createdAt = DateTime.now().toMillis()
    event.createdAtReadable = DateTime.now().toFormat("dd/LL/yyyy - HH:mm:ss")



    let eventRes = await eventRepository.create(event).catch(e=>{
        console.log(e)
    })

    if(!eventRes) return res.status(500).json({status: 500,message: "Something gone wrong contact admins"})
    res.send(eventRes)



}