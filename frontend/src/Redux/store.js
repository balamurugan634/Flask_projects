// import {combineReducers, configureStore} from '@reduxjs/toolkit'
// import userReducer from './user/userSlice'
// import storage from 'redux-persist/lib/storage'
// import persistReducer from 'redux-persist/es/persistReducer'
// import persistStore from 'redux-persist/es/persistStore'
// const rootreducers=combineReducers({user2:userReducer})
// const persistconfig={
//     key:'root',
//     storage,
//     version:1
// }
// const persistreducer=persistReducer(persistconfig,rootreducers)
// export const store=configureStore({
//     reducer:persistreducer,
//     middleware:(getDefaultMiddleware)=>(getDefaultMiddleware)({
//         serializableCheck:false,
//     }),
// }
// )
// export const persistor=persistStore(store)
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';

// Combine the reducers (you can add more reducers here if needed)
const rootReducers = combineReducers({ user: userReducer });

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducers);

// Configure the Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable state check
    }),
});

// Create a persistor for the store
export const persistor = persistStore(store);
