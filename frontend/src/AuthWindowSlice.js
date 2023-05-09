import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth_type: 0,
    remember: 0,
    authorized: 0
};

export const AuthWindowSlice = createSlice({
    name: 'AuthPage',
    initialState,
    reducers: {
        displayLogin: (state) => { state.auth_type = 0; },
        displayRegister: (state) => { state.auth_type = 1; },
        changeRemember: (state) => { state.remember = !state.remember; },
        setAuthorized: (state) => { state.authorized = 1; },
        noAuthorized: (state) => { state.authorized = 0; }
    }
});

export const {
    displayLogin,
    displayRegister,
    changeRemember,
    setAuthorized,
    noAuthorized
} = AuthWindowSlice.actions;

export const selectAuthType = (state) => state.AuthWindow.auth_type;
export const selectRemember = (state) => state.AuthWindow.remember;
export const selectAuthorized = (state) => state.AuthWindow.authorized;

export default AuthWindowSlice.reducer;
