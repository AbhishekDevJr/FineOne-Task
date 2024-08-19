import { createSlice } from "@reduxjs/toolkit";

interface UserDataState {
    items: Record<string, unknown>[];
}

const initialState: UserDataState = {
    items: [],
};

const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            return action.payload;
        }
    }
});

export const { setUserData } = userDataSlice.actions;
export default userDataSlice.reducer;