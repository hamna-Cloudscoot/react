import API from 'APIs/base'
import { ENDPOINT } from 'config/constants'

const getAvailableDays = async (file) => {
    return await API.getMethod(ENDPOINT.availability.getDays, false, file, false, true)
}

const getAvailableTimeSlots = async (file) => {
    return await API.getMethod(ENDPOINT.availability.getTimeSlots, false, file, false, true)
}

export default {
    getAvailableDays,
    getAvailableTimeSlots
}