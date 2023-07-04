import API from 'APIs/base'
import { ENDPOINT } from 'config/constants'

const getUserContacts = async () => {
    return await API.getMethod(ENDPOINT.contacts.getContacts, true);
}

export default {
    getUserContacts,
}