import NotificationProvider from './NotificationProviders/NotificationProvider';
import NotificationRepository from './NotificationRepository';
import NotificationService from './NotificationService';

function start(){
    const payload = {channel: "EMAIL", userId:1, message:"I want to talk" }
    const notificationRepository = new NotificationRepository()
    console.log('1...')
    notificationRepository.log()
    const notificationProvider = new NotificationProvider()
    const notificationService = new NotificationService(notificationRepository, notificationProvider);

    console.log(notificationService.processSendMessage(payload))
    console.log('3...')
    notificationRepository.log()
}

start()