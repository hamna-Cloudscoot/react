import axios from "axios";
import { store } from 'redux/store'
import { logout } from "redux/reducers/auth";
import { toast } from "react-toastify";
import { ENDPOINT } from "config/constants";
import { userFailure } from "redux/reducers/user";
import { emptyContactsState } from "redux/reducers/contactList";

const clearLocalStorage = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
}

const performLogout = () => {
    store.dispatch(logout())
    store.dispatch(userFailure())
    store.dispatch(emptyContactsState())
    clearLocalStorage()
}

const redirectToLogin = () => {
    performLogout()
    setTimeout(() => {
        window.location = '/login';
    }, 3000);
}

const consoleErrorPerformRedirection = (error) => {
    console.error(error?.response?.data?.message || error)
    toast.error(error?.response?.data?.message || error.message, {
        position: "top-right",
        autoClose: 2000,
    });
    if (error?.response?.status === 401) {
        redirectToLogin()
    }
    throw error
}

//Get Method
const getMethod = async (endpoint, authentication = true, data, printConsole = false) => {
    let params = {};
    let bearer_token;
    if (authentication) {
        const { auth } = store.getState();
        bearer_token = auth.accessToken || localStorage.getItem('accessToken');

        params = {
            headers: {
                "Authorization": `Bearer ${JSON.parse(bearer_token)}`
            }
        }
    }

    if (data) {
        params.params = data
    }

    return await axios.get(endpoint, params)
        .then((res) => {
            return res
        })
        .catch((error) => {
            consoleErrorPerformRedirection(error)
        })
}

// Post Method
const postMethod = async (endpoint, authentication = true, data = null, printConsole = false, multipart = false) => {
    let headers = {};

    if (authentication) {
        const { auth } = store.getState();
        var bearer_token = auth.accessToken || localStorage.getItem('accessToken');
        headers["Authorization"] = `Bearer ${JSON.parse(bearer_token)}`
    }
    if (multipart) {
        headers['content-type'] = 'multipart/form-data'
    }
    return await axios.post(endpoint, data, { headers })
        .then((res) => {
            return res
        })
        .catch((error) => {
            consoleErrorPerformRedirection(error)
        })
}

// Delete Method
const deleteMethod = async (endpoint, authentication = true, data = null, printConsole = false) => {
    header = {};
    if (authentication) {
        const { auth } = store.getState();
        var bearer_token = auth.accessToken || localStorage.getItem('accessToken');
        var header = {
            headers: {
                "Authorization": `Bearer ${JSON.parse(bearer_token)}`
            }
        }
    }
    return await axios.delete(endpoint, header)
        .then((res) => {
            return res
        })
        .catch((error) => {
            consoleErrorPerformRedirection(error)
        })
}

//Patch Method
const patchMethod = async (endpoint, authentication = true, data = null, printConsole = false) => {
    header = {};
    if (authentication) {
        const { auth } = store.getState();
        var bearer_token = auth.accessToken || localStorage.getItem('accessToken');
        var header = {
            headers: {
                "Authorization": `Bearer ${JSON.parse(bearer_token)}`
            }
        }
    }
    return await axios.patch(endpoint, data, header)
        .then((res) => {
            return res
        })
        .catch((error) => {
            consoleErrorPerformRedirection(error)
        })
}


export default {
    getMethod,
    postMethod,
    deleteMethod,
    patchMethod
};