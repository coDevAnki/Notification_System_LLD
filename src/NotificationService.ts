import NotificationStatus from "./enums/NotificationStatus.js";
import NotificationProvider from "./NotificationProviders/NotificationProvider";
import { NotiicationPayload } from "./NotificationProviders/NotificationProviderBase";
import NotificationRepository from "./NotificationRepository.js";

class NotificationService {
    constructor(
        private notificationRepository: NotificationRepository,
        private notificationProvider: NotificationProvider) {
    }

    processSendMessage(payload: NotiicationPayload) {
        if (!this.notificationProvider.isValidChannel(payload)) {
            return { success: false, message: "Invalid Payload" }
        }
        const record = this.notificationRepository.saveNotification(payload);
        console.log('2...')
        this.notificationRepository.log()
        let response = this.notificationProvider.sendNotification(payload);

        this.notificationRepository.updateNotification(record.id, {
            status: response.success ? NotificationStatus.SUCCESS : NotificationStatus.FAILIED,
            lastAttemptedAt: response.attemptedTime
        })
    }
}


export default NotificationService;