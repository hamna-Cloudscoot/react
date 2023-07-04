import API from 'APIs/base'
import { ENDPOINT } from 'config/constants'

const subscribeNewsletter = async (data) => {
    return await API.postMethod(ENDPOINT.newsletter_subscriber.subscribe, false, data);
}

export default {
    subscribeNewsletter
}