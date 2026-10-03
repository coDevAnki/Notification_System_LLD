import NotificationStatus from "./enums/NotificationStatus";
import { NotiicationPayload } from "./NotificationProviders/NotificationProviderBase.js";
import CustomError from "./types/CustomError.js";


interface NotificationEntity {
    id: number;
    userId: number;
    status: NotificationStatus;
    message: string;
    lastAttemptedAt?: ReturnType<typeof Date.now>;
    createdAt: ReturnType<typeof Date.now>;
    updatedAt: ReturnType<typeof Date.now>;
}

class NotificationRepository {
    private counter = 0;
    private indexedNotificationByIds: Record<string, NotificationEntity> = {}
    private notifications: NotificationEntity[] = [];

    saveNotification(payload: NotiicationPayload) {
        const currentTime = Date.now()
        const entitypayload = {
            id: ++this.counter,
            userId: payload.userId,
            status: NotificationStatus.PENDING,
            message: payload.message,
            createdAt: currentTime,
            updatedAt: currentTime
        }

        return this.save(entitypayload);
    }

    updateNotification(id: number, data: Omit<NotificationEntity, "id" | "userId" | "message" | "createdAt" | "updatedAt">) {
        if (!(id.toString() in this.indexedNotificationByIds)) {
            throw new CustomError('Invalid notification id')
        }
        const obj = this.indexedNotificationByIds[id.toString()];
        Object.keys(data).forEach(field => {
            obj[field] = data[field]
        })
    }
    private save(notification: NotificationEntity) {
        // console.log(notification, this.indexedNotificationByIds, this.notifications)
        if (notification.id.toString() in this.indexedNotificationByIds) {
            throw new CustomError('Invalid notification id')
        }
        this.indexedNotificationByIds[notification.id.toString()] = notification;
        this.notifications.push(notification);
        return notification;
    }

    log() {
        console.log(this.notifications)
    }
}


export default NotificationRepository