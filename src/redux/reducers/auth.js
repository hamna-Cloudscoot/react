const { createSlice } = require("@reduxjs/toolkit");
const initialState = {
    userId: null,
    accessToken: null,
    refreshToken: null,
}
const auth = createSlice({
    name: "auth", initialState, reducers: {
        authSuccess: (state, { payload: { accessToken, refreshToken, userId, user } }) => {
            state.accessToken = accessToken
            state.refreshToken = refreshToken
            state.userId = userId
        },
        logout: (state) => {
            state.accessToken = initialState.accessToken
            state.refreshToken = initialState.refreshToken
            state.userId = initialState.userId
        }
    }
})

export default auth.reducer

export const { authSuccess, logout } = auth.actions