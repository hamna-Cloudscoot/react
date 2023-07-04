import API from 'APIs/base'
import { ENDPOINT } from 'config/constants'
import { store } from 'redux/store'

const uploadFile = async (file) => {
    return await API.postMethod(ENDPOINT.file.upload, false, file, false, true)
}

const uploadFiles = async (files, userId, type) => {
    const { auth } = store.getState();
    const user = JSON.parse(auth.userId) || JSON.parse(localStorage.getItem('userId')) || userId

    return await API.postMethod(`${ENDPOINT.file.uploadMultiple.preUrl}${type}/${user}/${ENDPOINT.file.uploadMultiple.postUrl}`, false, files, false, true)
}

export default {
    uploadFile,
    uploadFiles
}