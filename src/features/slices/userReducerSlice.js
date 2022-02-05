import {createSlice} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

const initialState = {
  userInfo: {},
};

export const getAllUsers=async()=>{
  const snapshot = await firestore().collection('Users').get()
    return snapshot.docs.map(doc => doc.data());
}

export const userReducerSlice = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    storeUserInfo: (state, action) => {
      state.userInfo = {...action.payload};
    },
  },
});

// Action creators are generated for each case reducer function
export const {storeUserInfo} = userReducerSlice.actions;

export default userReducerSlice.reducer;
