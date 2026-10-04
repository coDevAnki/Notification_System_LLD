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
    abstract validatePayload(payload: T): { isValid: boolean; message?: string };
    abstract sendNotification(payload: T): Promise<NotificationResponse>; 
}

export default NotificationProviderBase;