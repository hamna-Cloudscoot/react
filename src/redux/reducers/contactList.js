const { createSlice } = require("@reduxjs/toolkit");
const initialState = {
    contacts: [],
}
const contactListState = createSlice({
    name: "contactList", initialState, reducers: {
        contactsState: (state, { payload: { contacts } }) => {
            state.contacts = contacts
        },
        emptyContactsState: (state) => {
            state.contacts = initialState.contacts
        }
    }
})

export default contactListState.reducer

export const { contactsState, emptyContactsState } = contactListState.actions