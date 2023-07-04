import API from 'APIs/base'
import { ENDPOINT } from 'config/constants'

const getSubAdmin = async () => {
    return await API.postMethod(ENDPOINT.subAdmin.getSubAdmin,true)
}


export default {
    getSubAdmin,
}