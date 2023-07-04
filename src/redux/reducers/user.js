const { createSlice } = require("@reduxjs/toolkit");
const initialState = {
    user: null,
}
const user = createSlice({
    name: "user", initialState, reducers: {
        userSuccess: (state, { payload: { user } }) => {
            state.user = user
        },
        userFailure: (state) => {
            state.user = initialState.user
        }
    }
})

export default user.reducer

export const { userSuccess, userFailure } = user.actions