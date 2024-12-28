import { configureStore } from '@reduxjs/toolkit'
import themeReducer from "./theme/themeSlice"
import userReducer from "./user/userSlice"

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        user: userReducer
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch