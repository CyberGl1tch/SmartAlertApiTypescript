import {getRepository} from "fireorm";
import {UserModel} from "../../Entities/user.model";
import {Roles} from "../../Enums/Role.enum";

export async function getUserInfo(request: any, response: any) {
    let decodedUser = request.user

    const userRepository = getRepository(UserModel);

    let findUser = await userRepository.findById(decodedUser.user_id)
    if(!findUser){
        return response.status(404).json({status: 404,message: "User not found!"})
    }
    return response.send(findUser)


}