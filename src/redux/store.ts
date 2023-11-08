import { configureStore } from '@reduxjs/toolkit';
import { tableApi } from './features/table.api';
import { setupListeners } from '@reduxjs/toolkit/query';
import {tableReducer} from "./features/table.slice";

export const store = configureStore({
    reducer: {
        [tableApi.reducerPath]: tableApi.reducer,
        table: tableReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tableApi.middleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;


