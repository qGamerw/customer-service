import {createSlice} from "@reduxjs/toolkit";

export const ClientsSlice = createSlice({
    name: 'users',
    initialState: {
        user: [],
    },
    reducers: {
        setClients: (state, action) => {
            state.user = action.payload;
        }
    },
})

export const {setClients} = ClientsSlice.actions;

export default ClientsSlice.reducer;