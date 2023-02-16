const { Collection } = require('fireorm');

@Collection()
export class EventModel {
    id!: string
    title!: string
/*    userId?: string
    endorsements?: string*/
    gravity!: number
/*    latitude?: number
    longitude?: number
    createdAt?: string
    approvedByUserId?: string*/
}