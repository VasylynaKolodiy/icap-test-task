import {StateCreator} from "zustand";
import {IRow, ITable} from "../../models/interfaces";

export interface ITableSlice {
    table: ITable;
    getTable: (limit: string, offset: string) => void;
    row: IRow | any;
    addRow: (data: IRow) => void;
    clearRow: () => void;
    editRow: (id: number, data: IRow) => void;
}

export const createTableSlice: StateCreator<ITableSlice> = (set) => ({
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

    getTable: async (limit, offset) => {
        const result = await fetch(`https://technical-task-api.icapgroupgmbh.com/api/table/?limit=${limit}&offset=${offset}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        set({table: await result.json()});
    },

    addRow: async (data) => {
        const result = await fetch('https://technical-task-api.icapgroupgmbh.com/api/table/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        set({row: await result.json()});
    },

    clearRow: () => {
        set({row: {}});
    },

    editRow: async (id, data) => {
        const result = await fetch(`https://technical-task-api.icapgroupgmbh.com/api/table/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        set({row: await result.json()});
    },
});
