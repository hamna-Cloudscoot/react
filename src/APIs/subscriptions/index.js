import API from 'APIs/base'
import { ENDPOINT } from 'config/constants'

const getAllSubscriptions = async () => {
    return await API.getMethod(ENDPOINT.subscription.getAllSubscriptions,false)
}


export default {
    getAllSubscriptions,
}