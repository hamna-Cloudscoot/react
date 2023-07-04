import API from 'APIs/base'
import { ENDPOINT } from 'config/constants'

const signUp = async (data) => {
    return await API.postMethod(ENDPOINT.auth.signUp, false, data)
}

const login = async (email, password) => {
    return await API.postMethod(ENDPOINT.auth.login, false, {
        email,
        password,
    })
}

const forgetPassword = async (email, role) => {
    return await API.postMethod(ENDPOINT.auth.forgetPassword, false, {
        email, role
    })
}

const verifyResetPasswordCode = async (code) => {
    return await API.getMethod(ENDPOINT.auth.verifyResetPasswordCode, false, {
        code,
    })
}

const changePassword = async (code, password) => {
    return await API.postMethod(ENDPOINT.auth.changePassword, false, {
        code, password,
    })
}

const emailAlreadyExist = async (email) => {
    return await API.postMethod(ENDPOINT.auth.emailExist, false, {
        email,
    })
}

export default {
    signUp,
    login,
    forgetPassword,
    verifyResetPasswordCode,
    changePassword,
    emailAlreadyExist
}