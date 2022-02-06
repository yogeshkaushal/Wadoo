import {createSlice} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

const initialState = {
  userInfo: {},
};

export const getAllUsers = async () => {
  const snapshot = await firestore().collection('Users').get();
  return snapshot.docs.map(doc => doc.data());
};

export const saveImageOnfirebase = (userId, imageUrl) => {
  return firestore().collection('Users').doc(userId).update({
    photo: imageUrl,
  });
};

export const userReducerSlice = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    storeUserInfo: (state, action) => {
      state.userInfo = {...action.payload};
    },
    updateImage: (state, action) => {
      state.userInfo.photo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {storeUserInfo, updateImage} = userReducerSlice.actions;

export default userReducerSlice.reducer;
