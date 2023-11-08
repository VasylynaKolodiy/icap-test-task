import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {IAuth} from "../../models/interfaces";;

export const tableApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "https://technical-task-api.icapgroupgmbh.com/api/"
    }),
    endpoints: (build) => ({
        postLogin: build.mutation<any, IAuth>({
            query: (body: IAuth) => ({
                url: 'login/',
                method: 'POST',
                body
            }),
        }),

        getTable1: build.query({
            query: (limit: string, offset: string) => ({
                url: `table/?limit=${limit}&offset=${offset}`,
            }),
        }),

    }),
});

export const {usePostLoginMutation, useGetTable1Query} = tableApi;
