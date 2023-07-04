const { createSlice } = require("@reduxjs/toolkit");
const initialState = {
    activeTab: null
}
const professionalLandingPage = createSlice({
    name: "professionalLandingPage", initialState, reducers: {
        setAllProfessionalPageActiveTab: (state, { payload: { activeTab } }) => {
            state.activeTab = activeTab
        }
    }
})

export default professionalLandingPage.reducer

export const { setAllProfessionalPageActiveTab } = professionalLandingPage.actions