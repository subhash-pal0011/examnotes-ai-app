import { createSlice } from "@reduxjs/toolkit";

const initialState = {
       getNotes: null,  
};

export const notesSlice = createSlice({
       name: "notes",
       initialState,
       reducers: {
              setGetNotes: (state, action) => {
                     state.getNotes = action.payload; 
              },
       },
});

export const { setGetNotes } = notesSlice.actions;
export default notesSlice.reducer;