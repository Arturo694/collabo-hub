export interface AllMyNotificationsResponse {
    success: boolean;
    notifications: Array<{
        title: string,
        message: string,
        createdAt: Date
    }>
}