import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth.slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: true,
})
export type RootState = ReturnType<typeof store.getState>

export default store
