import {AsyncStorage} from 'react-native';
import {Notifications, Permissions} from "expo";

const NOTIFICATION_KEY = 'FlashCards:notifications';

function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY);
}

function createNotification() {
    return {
        title: 'My flash cards',
        body: "Don't forget to study your flash cards today!",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(data => JSON.parse(data))
        .then(data => {
            if(data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({status}) => {
                        if(status === "granted") {
                            Notifications.cancelAllScheduledNotificationsAsync();

                            let now = new Date();
                            now.setHours(10);
                            now.setMinutes(45);

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: now,
                                    repeat: 'day'
                                }
                            );

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                        }
                    })
                    .catch(e => console.log(e));
            }
        })
        .catch();
}