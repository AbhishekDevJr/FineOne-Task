import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../components/Users/Users";
import { produce } from "immer";

interface UserDataState {
    userData: User[];
}

const initialState: UserDataState = {
    userData: [],
};

const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<User[]>) => {
            state.userData = action.payload; // Update the state directly
        },
        updateUser: (state, action: PayloadAction<User>) => {
            const userIndex = state.userData.findIndex(user => user.id === action.payload.id);
            if (userIndex !== -1) {
                state.userData[userIndex] = action.payload; // Update the specific user
            }
        },
        deleteUser: (state, action: PayloadAction<number>) => {
            state.userData = state.userData.filter(user => user.id !== action.payload);
        },
        addUser(state, action: PayloadAction<User>) {
            state.userData.push(action.payload);
        },
    },
});

export const { setUserData, updateUser, deleteUser, addUser } = userDataSlice.actions;
export default userDataSlice.reducer;
