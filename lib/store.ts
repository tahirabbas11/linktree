// import { configureStore } from '@reduxjs/toolkit';
// import {
//   TypedUseSelectorHook,
//   useDispatch as useAppDispatch,
//   useSelector as useAppSelector,
// } from 'react-redux';
// import rootReducer from './rootReducer';

// // ----------------------------------------------------------------------

// // Define the root state type using the ReturnType utility of TypeScript
// export type RootState = ReturnType<typeof rootReducer>;

// // Define the type for dispatching actions from the store
// export type AppDispatch = typeof store.dispatch;

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//       immutableCheck: false,
//     }),
// });

// // Extract the dispatch function from the store for convenience
// const { dispatch } = store;

// const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

// // Create a custom useDispatch hook with typed dispatch
// const useDispatch = () => useAppDispatch<AppDispatch>();

// // Export the Redux store, dispatch, useSelector, and useDispatch for use in components
// export { store, dispatch, useSelector, useDispatch };

// import { configureStore } from '@reduxjs/toolkit';
// import {
//   TypedUseSelectorHook,
//   useDispatch as useAppDispatch,
//   useSelector as useAppSelector,
// } from 'react-redux';
// import rootReducer from './rootReducer';

// export type RootState = ReturnType<typeof rootReducer>;
// export type AppDispatch = typeof store.dispatch;

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//       immutableCheck: false,
//     }),
// });

// const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;
// const useDispatch = () => useAppDispatch<AppDispatch>();

// export { store, useSelector, useDispatch };

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from './rootReducer';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;
const useDispatch = () => useAppDispatch<AppDispatch>();

const persistor = persistStore(store);

export { store, persistor, useSelector, useDispatch };
