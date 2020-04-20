import { TOGGLE_SUCCESS_MESSAGE } from '../actions/actions';

const notificationsList = [
    {
        origin: "addCardForm",
        message: "Card successfully created!",
        displayed: false
    },
];

function notificationsReducer(notifications = notificationsList, action) {
    switch (action.type) {
        case TOGGLE_SUCCESS_MESSAGE:
            return notifications.map((notif) => {
                if (notif.origin != 'addCardForm') {
                    return notif;
                } else {
                    return {
                        ...notif,
                        displayed: !notif.displayed
                    }
                }
            });

        default:
            return notifications;
    };
}

export default notificationsReducer;
