import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const messageNotification = createSlice({
  name: 'messageNotification',
  initialState: {
    count : 0
  },
  reducers: {
    setCount: (state,  { payload: { count } }) => {
      state.count = count;
    },    
  }
});


export default messageNotification.reducer;

export const { setCount } = messageNotification.actions