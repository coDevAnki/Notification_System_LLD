import NotificationTypes from "../enums/NotificationTypes";
import EmailNotificationProvider from "./EmailNotificationProvider";
import NotificationProviderBase, { NotiicationPayload } from "./NotificationProviderBase";
import SMSNotificationProvider from "./SMSNotificationProvider";
import CustomError from "../types/CustomError";

class NotificationProvider {
    private ServiceRegistry = new Map<NotificationTypes, NotificationProviderBase>();
        // [[NotificationTypes.EMAIL, new EmailNotificationProvider()],
        // [NotificationTypes.SMS, new SMSNotificationProvider()]]

    addNotficationProvider(type: NotificationTypes, provider: NotificationProviderBase){
        this.ServiceRegistry.set(type, provider);
    }

    sendNotification(payload: NotiicationPayload) {
        const provider = this.ServiceRegistry.get(payload.channel)!;
        try {
            const response = provider.sendNotification(payload);
            return response
        }
        catch (e) {
            if (e instanceof CustomError) {
                return { success: false, attemptedTime: Date.now(), message: (e as CustomError).message }
            }

            return { success: false, attemptedTime: Date.now(), message: "Something went wrong" }
        }
    }

    isValidChannel(payload: NotiicationPayload) {
        return this.ServiceRegistry.has(payload.channel)
    }
}

export default NotificationProvider