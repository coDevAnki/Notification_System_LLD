import NotificationTypes from "../enums/NotificationTypes.js";

export interface NotiicationPayload{
    channel: NotificationTypes,
    userId: number,
    message: string;
}
export interface NotificationResponse {
    success: boolean;
    attemptedTime: ReturnType<typeof Date.now>

}
abstract class NotificationProviderBase {
    abstract type: NotificationTypes;
    abstract validatePayload(payload:NotiicationPayload): boolean;
    abstract sendNotification(payload:NotiicationPayload): NotificationResponse; 
}

export default NotificationProviderBase;