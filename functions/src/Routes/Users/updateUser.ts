import {getRepository} from "fireorm";
import {UserModel} from "../../Entities/user.model";
import {Roles} from "../../Enums/Role.enum";

export async function updateUser(request: any, response: any) {
    const body: any = request.body
    let decodedUser = request.user

    const userRepository = getRepository(UserModel);

    let findUser = await userRepository.findById(decodedUser.user_id)
    if(!findUser){
        return response.status(404).json({status: 404,message: "User not found!"})
    }

    findUser.firstName = body.firstName ? body.firstName : findUser.firstName
    findUser.lastName = body.lastName ? body.lastName : findUser.lastName
    findUser.fcmToken = body.fcmToken ? body.fcmToken : findUser.fcmToken
    findUser.latitude = body.latitude ? body.latitude : findUser.latitude
    findUser.longitude = body.longitude ? body.longitude : findUser.longitude
    if(findUser.role === Roles.ADMIN){
        findUser.role = body.role ? body.role : findUser.role
    }

    let userRes = await userRepository.update(findUser).catch(e=>{
        console.log(e)
    })
    if(!userRes) return response.status(500).json({status: 500,message: "Something gone wrong contact admins"})
    response.send(userRes)

}