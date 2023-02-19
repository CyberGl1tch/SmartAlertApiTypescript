export declare class EventModel {
    id: string;
    title: string;
    description: string;
    userId?: string;
    votedByUsers: string[];
    gravity: number;
    latitude: number;
    longitude: number;
    createdAt?: number;
    createdAtReadable: string;
    approvedByUserId?: string | null;
}
