import { configureStore } from "@reduxjs/toolkit";
import storage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import userReducerSlice from "../features/counter/userReducerSlice";

const reducers = combineReducers({
  savedUserInfo: userReducerSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: {
    persistedUser: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
