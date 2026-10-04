import NotificationProvider from './NotificationProviders/NotificationProvider';
import NotificationRepository from './NotificationRepository';
import NotificationService from './NotificationService';

import NotificationTypes from './enums/NotificationTypes';
import EmailNotificationProvider from './NotificationProviders/EmailNotificationProvider';
import SMSNotificationProvider from './NotificationProviders/SMSNotificationProvider';

async function start(){
    const payload = {channel: NotificationTypes.EMAIL, userId:1, message:"I want to talk", email: "abcd@gmail.com"}
    const notificationRepository = new NotificationRepository()
    console.log('1...')
    notificationRepository.log()
    
    const notificationProvider = new NotificationProvider()
    notificationProvider.addNotficationProvider(NotificationTypes.EMAIL, new EmailNotificationProvider())
    notificationProvider.addNotficationProvider(NotificationTypes.SMS, new SMSNotificationProvider())

    const notificationService = new NotificationService(notificationRepository, notificationProvider);

    await notificationService.processSendMessage(payload)
    console.log('3...')
    notificationRepository.log()
}

start()