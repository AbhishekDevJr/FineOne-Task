import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    loginToken: string | undefined;
}

const initialState: AuthState = {
    loginToken: undefined,
};

//Auth Feature Slice that manages User Authentication
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoginToken: (state, action: PayloadAction<string | undefined>) => {
            state.loginToken = action.payload;
        },
        clearLoginToken: (state) => {
            state.loginToken = undefined;
        },
    },
});

export const { setLoginToken, clearLoginToken } = authSlice.actions;

export default authSlice.reducer;
