import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ILoginResult, IRow} from "../../models/interfaces";

const initialState = {
    login: {},
    table: {},
    row: {},
}

export const tableSlice = createSlice({
    name: "tableName",
    initialState,
    reducers: {
        setLoginResult(state, action: PayloadAction<ILoginResult>) {
            state.login = action.payload;
        },

        clearLoginResult(state) {
            state.login = {};
        },

        setRow(state, action: PayloadAction<IRow>) {
            state.row = action.payload;
        },

        clearRow(state) {
            state.row = {};
        },
    }
})

export const tableActions = tableSlice.actions
export const tableReducer = tableSlice.reducer