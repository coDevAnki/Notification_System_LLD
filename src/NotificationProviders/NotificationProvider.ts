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

    getNotficationProvider(channel: NotificationTypes){
        return this.ServiceRegistry.get(channel);
    }
    
    sendNotification(payload: NotiicationPayload) {
        const provider = this.getNotficationProvider(payload.channel)!;
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
    isValidPayload(channel: NotificationTypes, payload: NotiicationPayload): { isValid: boolean; message?: string } {
        const provider = this.getNotficationProvider(channel)
        if(provider) return provider.validatePayload(payload)
        return { isValid: false, message: `No provider registered for channel: ${channel}` };    
    }
}

export default NotificationProvider