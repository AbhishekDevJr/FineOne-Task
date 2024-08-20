import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../components/Users/Users";

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
            state.userData = action.payload;
        },
        updateUser: (state, action: PayloadAction<User>) => {
            const userIndex = state.userData.findIndex(user => user.id === action.payload.id);
            if (userIndex !== -1) {
                state.userData[userIndex] = action.payload;
            }
        },
        deleteUser: (state, action: PayloadAction<number>) => {
            state.userData = state.userData.filter(user => user.id !== action.payload);
        },
        addUser: (state, action: PayloadAction<User>) => {
            const newUserId = state.userData.length > 0 ? state.userData[state.userData.length - 1].id + 1 : 1;
            state.userData.push({ ...action.payload, id: newUserId });
        },
    },
});

export const { setUserData, updateUser, deleteUser, addUser } = userDataSlice.actions;
export default userDataSlice.reducer;
