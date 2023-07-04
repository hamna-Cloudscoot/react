import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const requestAccepted = createSlice({
  name: 'requestAccepted',
  initialState: {
    id : null
  },
  reducers: {
    setAccepted: (state,  { payload: { id } }) => {
      state.id = id;
    },    
  }
});


export default requestAccepted.reducer;

export const { setAccepted } = requestAccepted.actions