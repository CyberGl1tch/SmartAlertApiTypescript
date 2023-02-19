import {getRepository} from "fireorm";
import {UserModel} from "../../Entities/user.model";
import {Roles} from "../../Enums/Role.enum";

export async function createUser(request: any, response: any) {
    const body: any = request.body
    if(!body.firstName && !body.lastName) return response.status(409).json({status: 409,message: "Missing core values"})
    let decodedUser = request.user
    const userRepository = getRepository(UserModel);

    let findUser = await userRepository.findById(decodedUser.user_id)
    if(findUser){
        return response.status(403).json({status: 403,message: "User already Exists"})
    }

    let user = new UserModel()
    user.id = decodedUser.user_id
    user.firstName = body.firstName
    user.lastName = body.lastName
    user.role = Roles.USER
    user.latitude = body.latitude ? body.latitude : ""
    user.longitude = body.longitude ? body.longitude : ""

    user.fcmToken = body.fcmToken ? body.fcmToken :""

    let userRes = await userRepository.create(user).catch(e=>{
        console.log(e)
    })
    if(!userRes) return response.status(500).json({status: 500,message: "Something gone wrong contact admins"})
    response.send(userRes)

}