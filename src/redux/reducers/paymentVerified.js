import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const paymentVerified = createSlice({
    name: 'paymentVerified',
    initialState: {
        isVerified: null
    },
    reducers: {
        setPaymentVerifiedStore: (state, { payload: { isVerified } }) => {
            state.isVerified = isVerified;
        },
    }
});


export default paymentVerified.reducer;

export const { setPaymentVerifiedStore } = paymentVerified.actions