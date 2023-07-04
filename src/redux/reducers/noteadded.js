import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const noteAdded = createSlice({
    name: 'noteAdded',
    initialState: {
        isNoteAdded: null
    },
    reducers: {
        setNoteAdded: (state, { payload: { isNoteAdded } }) => {
            state.isNoteAdded = isNoteAdded;
        },
    }
});


export default noteAdded.reducer;

export const { setNoteAdded } = noteAdded.actions