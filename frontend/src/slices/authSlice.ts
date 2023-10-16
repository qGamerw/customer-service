import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IUserResponse} from "../types/types";
import {user} from "../constants/constants";

interface AuthState {
    isLoggedIn: boolean;
    user: IUserResponse | null;
}

const initialState: AuthState = {
    isLoggedIn: Boolean(user),
    user: user || null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login: (state, action: PayloadAction<IUserResponse>) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
        }
    },
})

export const {login, logout} = authSlice.actions

export default authSlice.reducer