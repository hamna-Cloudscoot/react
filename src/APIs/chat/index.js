import API from 'APIs/base'
import { ENDPOINT } from 'config/constants'

const getRoomMessages = async (id) => {
    return await API.getMethod(`${ENDPOINT.messages.getChatMessages}/${id}`, true);
}

const deleteAllMessages = async (data) => {
    return await API.patchMethod(ENDPOINT.messages.deleteAllMessages, true, data);
}

const getUnreadMessageCount = async () => {
    return await API.getMethod(ENDPOINT.messages.unreadCount, true);
}
export default {
    getRoomMessages,
    deleteAllMessages,
    getUnreadMessageCount
}