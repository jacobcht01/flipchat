import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserReducer from "./user/userSlice";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  keyPrefix: "Flipchat-",
  whitelist: [],
};

const persistedUserReducer = persistReducer(persistConfig, UserReducer);

const rootReducer = combineReducers({
  user: persistedUserReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

const persistedStore = persistStore(store);

export { persistedStore, store };
