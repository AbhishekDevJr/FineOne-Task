import { configureStore } from "@reduxjs/toolkit";
import userDataSlice from "../features/userDataSlice";
import authSlice from "../features/authSlice";

export const store = configureStore({
    reducer: {
        userData: userDataSlice,
        auth: authSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;