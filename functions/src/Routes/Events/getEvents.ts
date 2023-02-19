import {getRepository} from "fireorm";
import {EventModel} from "../../Entities/event.model";
import {calculateDanger, getDistanceFromLatLonInKm} from "../../Utils/MathUtils";
import lodash from 'lodash'
import {UserModel} from "../../Entities/user.model";
import {Roles} from "../../Enums/Role.enum";

export async function getEvents(req: any, res: any) {

    let decodedUser = req.user
    const userRepository = getRepository(UserModel);
    let user = await userRepository.findById(decodedUser.user_id)


    const eventRepository = getRepository(EventModel);
    let events;
    if(user.role === Roles.USER){
        events = await eventRepository.whereNotEqualTo(event => event.approvedByUserId,null).find()
    }else{
        events = await eventRepository.orderByAscending(event => event.createdAt).find()
    }

    let eventsNew = events.map(event => {
        return {
            ...event,
            danger: calculateDanger(event.votedByUsers?.length,event.gravity)
        }
    })
    eventsNew = lodash.sortBy(eventsNew,["danger","createdAt"]).reverse()
    res.send(eventsNew)



}