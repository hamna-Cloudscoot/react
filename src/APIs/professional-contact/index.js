import API from 'APIs/base'
import { ENDPOINT } from 'config/constants'

const sendProfessionalRequest = async (data) => {
    return await API.postMethod(ENDPOINT.professionalContact.sendRequest, false, data)
}

export default {
    sendProfessionalRequest
}