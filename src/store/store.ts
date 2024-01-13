import { configureStore } from '@reduxjs/toolkit'
import { appApi } from './appApi'

export const store = configureStore({
  reducer: {
    [appApi.reducerPath]: appApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(appApi.middleware),
})
