import { createSlice } from '@reduxjs/toolkit';

const signupEmail = createSlice({
    name: 'signupEmail',
    initialState: {
        email: null
    },
    reducers: {
        setEmail: (state, { payload: { email } }) => {
            state.email = email;
        },
    }
});


export default signupEmail.reducer;

export const { setEmail } = signupEmail.actions