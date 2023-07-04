import API from 'APIs/base'
import { ENDPOINT } from 'config/constants'

const getGuidelineByType = async (type) => {
    return await API.getMethod(`${ENDPOINT.guidelines.getBytype}/${type}`,false);
}

export default {
    getGuidelineByType
}