import {AsyncStorage} from 'react-native';
import {Notifications, Permissions} from "expo";

const DAY_IN_MILISSECONDS = 24 * 60 * 60 * 1000;
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

function launchNotification() {
    Notifications.cancelAllScheduledNotificationsAsync();

    let now = new Date();

    let tomorrow = new Date(now.getTime() + DAY_IN_MILISSECONDS);
    tomorrow.setHours(now.getHours());
    tomorrow.setMinutes(now.getMinutes());

    Notifications.scheduleLocalNotificationAsync(
        createNotification(),
        {
            time: tomorrow,
            repeat: 'day'
        }
    );
}

export function setLocalNotification() {
    clearLocalNotification();
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(data => JSON.parse(data))
        .then(data => {
            if(data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({status}) => {
                        if(status === "granted") {

                            launchNotification();

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                        }
                    })
                    .catch(e => console.log(e));
            }
        })
        .catch();
}

export function reScheduleLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(data => JSON.parse(data))
        .then(data => {
            if(data) {
                launchNotification();
            }
        })
        .catch(e => console.log(e));
}
