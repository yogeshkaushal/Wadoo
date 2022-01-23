import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {},
};

export const userReducerSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    storeUserInfo: (state, action) => {
      state.userInfo = { ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeUserInfo } = userReducerSlice.actions;

export default userReducerSlice.reducer;
