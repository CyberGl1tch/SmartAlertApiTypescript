import {getRepository} from "fireorm";
import {UserModel} from "../../Entities/user.model";
import {EventModel} from "../../Entities/event.model";
import {Roles} from "../../Enums/Role.enum";
import {calculateDanger} from "../../Utils/MathUtils";
import lodash from "lodash";
const admin = require('firebase-admin');

export async function notifyTest(req: any, res: any) {

    let decodedUser = req.user
    const userRepository = getRepository(UserModel);
    let user = await userRepository.findById(decodedUser.user_id)
    let fcmToken = user.fcmToken
    const message = {
        notification: {
            title: 'This is a test Notification',
            body: 'Test Description'
        },
        topic: "alerts"
    };


    admin.messaging().send(message)
        .then((response: any) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error: any) => {
            console.log('Error sending message:', error);
        });

    res.status(200).send({status:200})




}