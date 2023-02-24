import { configureStore } from "@reduxjs/toolkit";
import auth from './auth/auth.slice';
import reports from './reports/reports.slice';
import sales from './sales/sales.slice';
import products from './products/products.slice';
import brands from './brands/brands.slice';
import employees from './employees/employees.slice';
import egresses from './egresses/egresses.slice';
import users from './users/users.slice';
import notifications from './notifications/notifications.slice';

export const store = configureStore({
    reducer: {
        auth,
        reports,
        sales,
        products,
        brands,
        employees,
        egresses,
        users,
        notifications,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
