// store/index.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
// import {CookieStorage} from 'redux-persist-cookie-storage';
import storage from 'redux-persist/lib/storage';
import authReducer from '../reducers/authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
});

// const cookieOptions = {
//   expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year expiration
//   path: '/',
// };

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
