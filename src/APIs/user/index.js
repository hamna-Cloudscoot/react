import API from 'APIs/base'
import { ENDPOINT } from 'config/constants'

const getLawyers = async (search, user_id) => {
    if (search && user_id) {
        return await API.getMethod(`${ENDPOINT.user.getLawyers}?search=${search}&user_id=${user_id}`, false)
    }
    else if (search)
        return await API.getMethod(`${ENDPOINT.user.getLawyers}?search=${search}`, false)
    else if (user_id)
        return await API.getMethod(`${ENDPOINT.user.getLawyers}?user_id=${user_id}`, false)
    else
        return await API.getMethod(`${ENDPOINT.user.getLawyers}`, false)
}

const getCo_Founder = async (search) => {
    if (search)
        return await API.getMethod(`${ENDPOINT.user.getCo_Founder}?search=${search}`, false)
    else
        return await API.getMethod(`${ENDPOINT.user.getCo_Founder}`, false)
}

const getFounders = async (search) => {
    if (search)
        return await API.getMethod(`${ENDPOINT.user.getFounders}?search=${search}`, false)
    else
        return await API.getMethod(`${ENDPOINT.user.getFounders}`, false)
}

const getAccountant = async (search) => {
    if (search)
        return await API.getMethod(`${ENDPOINT.user.getAccountants}?search=${search}`, false)
    else
        return await API.getMethod(`${ENDPOINT.user.getAccountants}`, false)
}

const getOneUser = async (id) => {
    return await API.getMethod(`${ENDPOINT.user.getOneUser}/${id}`, false)
}

const getIPv4 = async () => {
    return await API.getMethod(ENDPOINT.IPv4.get, false);
}

const createVisitor = async (data) => {
    return await API.postMethod(ENDPOINT.visitor.createVisitor, false, data);
}

export default {
    getLawyers,
    getFounders,
    getOneUser,
    getIPv4,
    createVisitor,
    getAccountant,
    getCo_Founder,
}