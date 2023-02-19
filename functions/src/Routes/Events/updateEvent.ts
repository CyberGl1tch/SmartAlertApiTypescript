import {getRepository} from "fireorm";
import {EventModel} from "../../Entities/event.model";
import {v4 as uuidv4} from "uuid";
import {DateTime} from "luxon";
import {UserModel} from "../../Entities/user.model";
import {Roles} from "../../Enums/Role.enum";

export async function updateEvent(req: any, res: any) {
    const body: any = req.body
    if(!req.params.id) return res.status(409).json({status: 409,message: "Missing core values"})
    let decodedUser = req.user

    const eventRepository = getRepository(EventModel);
    const userRepository = getRepository(UserModel);

    let user = await userRepository.findById(decodedUser.user_id)
    let event = await eventRepository.findById(req.params.id)
    if(!event){
        return res.status(404).json({status: 404,message: "Event not found!"})
    }

    if(event.userId !== decodedUser.user_id && (user.role !== Roles.ADMIN && user.role !== Roles.SUPPORT)){
        return res.status(403).json({status: 403,message: "You can not edit others events!"})

    }
    event = Object.assign(event,body)


    let eventRes = await eventRepository.update(event).catch(e=>{
        console.log(e)
    })

    if(!eventRes) return res.status(500).json({status: 500,message: "Something gone wrong contact admins"})
    res.send(eventRes)



}