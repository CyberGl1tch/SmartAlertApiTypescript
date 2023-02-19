import {getRepository} from "fireorm";
import {EventModel} from "../../Entities/event.model";
import {UserModel} from "../../Entities/user.model";
import {Roles} from "../../Enums/Role.enum";

export async function voteEvent(req: any, res: any) {
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

    if(event.votedByUsers.includes(user.id)){
        return res.status(403).json({status: 403,message: "You have already vote this event!"})
    }
    event.votedByUsers.push(user.id)


    let eventRes = await eventRepository.update(event).catch(e=>{
        console.log(e)
    })

    if(!eventRes) return res.status(500).json({status: 500,message: "Something gone wrong contact admins"})
    res.send(eventRes)



}