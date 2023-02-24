import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notifications: [],
    notification: {},
    error: null,
    loading: false,
    noSee: 0,
};

export const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        getNotifications: (state) => {
            state.loading = true;
            state.error = false;
        },
        getNotificationsSuccess: (state, action) => {
            state.loading = false;
            state.notifications = action.payload.result;
            state.noSee = action.payload.noSee
            state.error = false;
        },
        getNotificationsError: (state) => {
            state.loading = false;
            state.error = true;
        },
    },
});

export const {
    getNotifications,
    getNotificationsSuccess,
    getNotificationsError,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
