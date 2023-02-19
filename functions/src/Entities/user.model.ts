const { Collection } = require('fireorm');

@Collection()
export class UserModel {
    id!: string
    firstName!: string
    lastName!: string
    role!: string
    fcmToken!: string
    latitude!: number
    longitude!: number
}