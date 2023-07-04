const { createSlice } = require("@reduxjs/toolkit");
const initialState = {
    requestId: null,
    meetingId: null,
}
const common = createSlice({
    name: "common", initialState, reducers: {
        requestSuccess: (state, { payload: { requestId } }) => {
            state.requestId = requestId
        },
        selectedMeeting: (state, { payload: { meetingId } }) => {
            state.meetingId = meetingId
        }
    }
})

export default common.reducer

export const { requestSuccess, selectedMeeting } = common.actions