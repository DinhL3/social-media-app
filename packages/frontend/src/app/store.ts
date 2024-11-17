import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice';
import postReducer from '../features/post/postSlice';

// Define the store using TypeScript
const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    posts: postReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
