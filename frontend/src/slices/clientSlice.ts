import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface User{
    id: number;
    username: string;
    number: string;
    dateOfBirth: Date;
    email: string;
}

interface UserState {
    Users: User[];
}

const initialState: UserState = {
    Users: [],
};
export const UsersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        setUsers: (state, action:PayloadAction<User[]>) => {
            state.Users = action.payload;
        }
    },
})

export const {setUsers} = UsersSlice.actions;

export default UsersSlice.reducer;