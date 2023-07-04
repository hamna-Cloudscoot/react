import API from 'APIs/base'
import { ENDPOINT } from 'config/constants'

const getMeetings = async (startDate = null, endDate = null) => {
    let data = {};
    if (startDate && endDate) {
        data.startDate = startDate
        data.endDate = endDate
    }
    return await API.getMethod(`${ENDPOINT.meetings.getMeetings}`, true, data);
}

const createMeeting = async (data) => {
    return await API.postMethod(`${ENDPOINT.meetings.createMeeting}`, true, data);
}

const getMeetingDetails = async (id) => {
    return await API.getMethod(`${ENDPOINT.meetings.getMeetings}/${id}`, true);
}

const updateParticipants = async (data) => {
    return await API.patchMethod(ENDPOINT.meetings.updateParicipants, true, data);
}

const addMeetingNote = async (data) => {
    return await API.postMethod(ENDPOINT.meetings.addNote, true, data);
}

export default {
    getMeetings,
    createMeeting,
    getMeetingDetails,
    updateParticipants,
    addMeetingNote
}