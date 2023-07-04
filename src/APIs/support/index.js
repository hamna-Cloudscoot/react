import API from 'APIs/base'
import { ENDPOINT } from 'config/constants'

const sendSupportRequest = async (data) => {
    return await API.postMethod(ENDPOINT.support.create, false, data)
}

export default {
    sendSupportRequest
}