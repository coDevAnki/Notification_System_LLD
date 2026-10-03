import NotificationTypes from "../enums/NotificationTypes";
import NotificationProviderBase, { NotiicationPayload } from "./NotificationProviderBase";

interface EmailNotificationPayload extends NotiicationPayload{
  email: string;
  message: string;
}

class EmailNotificationProvider implements NotificationProviderBase<EmailNotificationPayload>{
    
    type= NotificationTypes.EMAIL
    validatePayload(payload: EmailNotificationPayload){
        if (!payload.email) return { isValid: false, message: "Missing required field: email" };
        if (!payload.message) return { isValid: false, message: "Missing required field: message" };
        return { isValid: true };
    }
    sendNotification(payload: EmailNotificationPayload) {
        return {success: true, attemptedTime: Date.now()};
    }
}

export default EmailNotificationProvider;