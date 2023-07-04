import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const boardroomCreated = createSlice({
  name: 'boardroomCreated',
  initialState: {
    meeting : null
  },
  reducers: {
    setMeeting: (state,  { payload: { meeting } }) => {
      state.meeting = meeting;
    },    
  }
});


export default boardroomCreated.reducer;

export const { setMeeting } = boardroomCreated.actions