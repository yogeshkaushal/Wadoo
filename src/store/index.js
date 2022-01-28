import {configureStore} from '@reduxjs/toolkit';
import storage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import userReducerSlice from '../features/slices/userReducerSlice';
import savedBooksSlice from '../features/slices/savedBooksSlice';

const reducers = combineReducers({
  savedUserInfo: userReducerSlice,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: {
    persistedUser: persistedReducer,
    savedBooks: savedBooksSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
