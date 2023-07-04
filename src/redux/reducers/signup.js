const { createSlice } = require("@reduxjs/toolkit");
const initialState = {
    signingUp: null,
    loggedIn: null,
    accessToken: null,
    refreshToken: null,
    expiresIn: null,
    role: null
}
const userInitialState = {
    profilePicId: null,
    firstName: null,
    lastName: null,
    email: null,
    password: null
}
const signUp = createSlice({
    name: "signup", initialState, reducers: {
        signUpRequest: (state, action) => {
            state.signingUp = true
        },
        signUpSuccess: (state, { payload: { accessToken, refreshToken, role } }) => {
            state.accessToken = accessToken
            state.refreshToken = refreshToken
            state.signingUp = false
            state.loggedIn = true
            state.role = role
        }
    }
})

export default signUp.reducer

export const { signUpRequest, signUpSuccess } = signUp.actions