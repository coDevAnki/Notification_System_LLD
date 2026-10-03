import NotificationTypes from "../enums/NotificationTypes.js";
import EmailNotificationProvider from "./EmailNotificationProvider.js";
import NotificationProviderBase, { NotiicationPayload } from "./NotificationProviderBase";
import SMSNotificationProvider from "./SMSNotificationProvider.js";
import CustomError from "../types/CustomError.js";

class NotificationProvider {
    private ServiceRegistry = new Map<NotificationTypes, NotificationProviderBase>([
        [NotificationTypes.EMAIL, new EmailNotificationProvider()],
        [NotificationTypes.SMS, new SMSNotificationProvider()]
    ]);

    sendNotification(payload: NotiicationPayload) {
        const provider = this.ServiceRegistry.get(payload.channel)!;
        try {
            const response = provider.sendNotification(payload);
            // console.log(response)
            return response
        }
        catch (e) {
            if (e instanceof CustomError) {
                return { success: false, message: (e as CustomError).message }
            }

            return { success: false, message: "Something went wrong" }
        }
    }

    isValidChannel(payload: NotiicationPayload) {
        return this.ServiceRegistry.has(payload.channel)
    }
}

export default NotificationProvider