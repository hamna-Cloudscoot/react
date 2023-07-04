import API from 'APIs/base'
import { ENDPOINT } from 'config/constants'

const getNotificationCount = async () => {
    return await API.getMethod(ENDPOINT.notification.count, true)
}

const getNotifications = async () => {
    return await API.getMethod(ENDPOINT.notification.get, true)
}

export default {
    getNotificationCount,
    getNotifications
}