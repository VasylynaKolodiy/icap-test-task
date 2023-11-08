import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITable} from "../../models/interfaces";

const initialState = {
    table: {
        count: 0,
        next: '',
        previous: '',
        results: []
    },

    row: {
        name: null,
        email: '',
        birthday_date: '',
        phone_number: '',
        address: '',
    },
}

export const tableSlice = createSlice({
    name: "tableName",
    initialState,
    reducers: {

        setTable(state, action: PayloadAction<ITable>) {
            state.table = action.payload;
        },


    }
})

export const tableActions = tableSlice.actions
export const tableReducer = tableSlice.reducer