import NotificationTypes from "../enums/NotificationTypes";

export interface NotiicationPayload{
    channel: NotificationTypes,
    userId: number,
    message: string;
}
export interface NotificationResponse {
    success: boolean;
    attemptedTime: ReturnType<typeof Date.now>

}
abstract class NotificationProviderBase<T extends NotiicationPayload = NotiicationPayload> {
    abstract type: NotificationTypes;
    abstract validatePayload(payload: T): boolean;
    abstract sendNotification(payload: T): NotificationResponse; 
}

export default NotificationProviderBase;