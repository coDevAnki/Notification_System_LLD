import NotificationTypes from "../enums/NotificationTypes";
import NotificationProviderBase, { NotiicationPayload } from "./NotificationProviderBase";

interface SMSNotificationPayload extends NotiicationPayload{
  extention: string;
  phone: string;
  message: string;
}

class SMSNotificationProvider implements NotificationProviderBase<SMSNotificationPayload> {

    type = NotificationTypes.SMS
    validatePayload(payload: SMSNotificationPayload) {
        if (!payload.phone) return { isValid: false, message: "Missing required field: phone" };
        if (!payload.message) return { isValid: false, message: "Missing required field: message" };
        return { isValid: true };
    }
    sendNotification(payload: SMSNotificationPayload) {
        return {success: true, attemptedTime: Date.now()};
    }
}

export default SMSNotificationProvider;