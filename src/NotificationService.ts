import NotificationStatus from "./enums/NotificationStatus";
import NotificationProvider from "./NotificationProviders/NotificationProvider";
import { NotiicationPayload } from "./NotificationProviders/NotificationProviderBase";
import NotificationRepository from "./NotificationRepository";

class NotificationService {
    constructor(
        private notificationRepository: NotificationRepository,
        private notificationProvider: NotificationProvider) {
    }

    processSendMessage(payload: NotiicationPayload) {
        if (!this.notificationProvider.isValidChannel(payload)) {
            return { success: false, message: `Invalid channel: ${payload.channel}` }
        }
        
        const validation = this.notificationProvider.isValidPayload(payload.channel, payload);
        if (!validation.isValid) {
            return { success: false, message: validation.message || "Invalid Payload" }
        }
        const record = this.notificationRepository.saveNotification(payload);

        try {
            let response = this.notificationProvider.sendNotification(payload);

            this.notificationRepository.updateNotification(record.id, {
                status: response.success ? NotificationStatus.SUCCESS : NotificationStatus.FAILIED,
                lastAttemptedAt: response.attemptedTime
            })

            return {
                success: response.success,
                message: response.success
                    ? `${payload.channel} notification sent successfully`
                    : `${payload.channel} notification failed`
            }
        } catch (error) {
            this.notificationRepository.updateNotification(record.id, {
                status: NotificationStatus.FAILIED,
                lastAttemptedAt: Date.now()
            })

            return {
                success: false,
                message: error instanceof Error ? error.message : `${payload.channel} notification failed unexpectedly`
            }
        }
    }
}

export default NotificationService;