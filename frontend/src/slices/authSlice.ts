import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface UserResponse {
    id: number;
    username: string;
    number: string;
    dateOfBirth: Date;
}

interface AuthState {
    isLoggedIn: boolean;
    user: UserResponse | null;
}

const user: UserResponse | null = JSON.parse(localStorage.getItem('user') || "null");

const initialState: AuthState = {
    isLoggedIn: Boolean(user),
    user: user || null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login: (state, action: PayloadAction<UserResponse>) => {
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