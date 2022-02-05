import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  allBooks: [],
};



export const savedBooksSlice = createSlice({
  name: 'savedBooks',
  initialState,
  reducers: {
    storeAllBooks: (state, action) => {
      state.allBooks = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {storeAllBooks} = savedBooksSlice.actions;

export default savedBooksSlice.reducer;
