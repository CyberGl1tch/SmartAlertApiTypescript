import {getRepository} from "fireorm";
import {EventModel} from "../../Entities/event.model";
import {UserModel} from "../../Entities/user.model";
import {Roles} from "../../Enums/Role.enum";
import admin from "firebase-admin";

export async function approveEvent(req: any, res: any) {
    const body: any = req.body
    if(!req.params.id) return res.status(409).json({status: 409,message: "Missing core values"})
    let decodedUser = req.user

    const eventRepository = getRepository(EventModel);
    const userRepository = getRepository(UserModel);

    let user = await userRepository.findById(decodedUser.user_id)
    console.log(user)
    let event = await eventRepository.findById(req.params.id)
    if(!event){
        return res.status(404).json({status: 404,message: "Event not found!"})
    }

    if(user.role !== Roles.ADMIN  && user.role !==Roles.SUPPORT){
        return res.status(403).json({status: 403,message: "You cant approve events!"})

    }

    event.approvedByUserId = user.id

    if(!event.votedByUsers.includes(user.id))
        event.votedByUsers?.push(user.id)

    console.log(event)
    let eventRes = await eventRepository.update(event).catch(e=>{
        console.log(e)
    })

    if(!eventRes) return res.status(500).json({status: 500,message: "Something gone wrong contact admins"})
    res.send(eventRes)

    const message = {
        notification: {
            title: `${eventRes.title}`,
            body: `${eventRes.description}`
        },
        topic: "alerts"
    };
    admin.messaging().send(message)
        .then((response: any) => {
            console.log('Successfully sent message:', response);
        })
        .catch((error: any) => {
            console.log('Error sending message:', error);
        });



}