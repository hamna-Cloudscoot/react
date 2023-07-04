import API from 'APIs/base'
import { ENDPOINT } from 'config/constants'

const getReceivedRequests = async () => {
    return await API.getMethod(ENDPOINT.contact_requests.received, true);
}

const changeStatusOfContactRequest = async (contact, status) => {
    return await API.postMethod(`${ENDPOINT.contact_requests.changeContactRequestStatus}/${contact}/${status}`, true);
}

export default {
    getReceivedRequests,
    changeStatusOfContactRequest
}