import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {IAuth, ILoginResult, IRow, ITable} from "../../models/interfaces";

export const tableApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "https://technical-task-api.icapgroupgmbh.com/api/"
    }),
    endpoints: (build) => ({
        postLogin: build.mutation<ILoginResult, IAuth>({
            query: (body: IAuth) => ({
                url: 'login/',
                method: 'POST',
                body
            }),
        }),

        getTable: build.query<ITable, string[]>({
            query: (params) => ({
                url: `table/?limit=${params[0]}&offset=${params[1]}`,
            }),
        }),

        addRow: build.mutation<any, IRow>({
            query: (newRow: IRow) => ({
                url: 'table/',
                method: 'POST',
                body: newRow,
            }),
        }),

        editRow: build.mutation<any, IRow>({
            query: (updatedRow: IRow) => ({
                url: `table/${updatedRow.id}/`,
                method: 'PATCH',
                body: updatedRow,
            }),
        }),
    }),
});

export const { usePostLoginMutation, useGetTableQuery, useAddRowMutation, useEditRowMutation } = tableApi;
