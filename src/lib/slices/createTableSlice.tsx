import {StateCreator} from "zustand";
import {ITable} from "../../models/interfaces";

export interface IInitialUser {
    id?: number;
    name: string | null;
    email: string;
    birthday_date: string;
    phone_number: string;
    address: string;
}

export interface ITableSlice {
    table: ITable;
    fetchTable: (limit: string, offset: string) => void;
    user: IInitialUser;
    addUser: (data: IInitialUser) => void;
    removeInfo: () => void;
    editUser: (id: number, data:IInitialUser) => void;
}

export const createTableSlice: StateCreator<ITableSlice> = (set) => ({
    table: {
        count: 0,
        next: '',
        previous: '',
        results: []
    },

    user: {
        name: null,
        email: '',
        birthday_date: '',
        phone_number: '',
        address: '',
    },
    
    fetchTable: async (limit, offset) => {
        const res = await fetch(`https://technical-task-api.icapgroupgmbh.com/api/table/?limit=${limit}&offset=${offset}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        set({table: await res.json()});
    },

    addUser: async (data) => {
        const res = await fetch('https://technical-task-api.icapgroupgmbh.com/api/table/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        set({user: await res.json()});
    },

    removeInfo: () => {
        set({user: {}});
    },

    editUser: async (id, data) => {
        const res = await fetch(`https://technical-task-api.icapgroupgmbh.com/api/table/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        set({user: await res.json()});
    },
});
