import {StateCreator} from "zustand";
import {IAuth} from "../../models/interfaces";

export interface ILoginSlice {
    loginResult: any | {};
    getLogin: (data: IAuth) => void;
    clearLoginResult: () => void;
}

export const createLoginSlice: StateCreator<ILoginSlice> = (set) => ({
    loginResult: {},
    getLogin: async (data) => {
        try {
            const res = await fetch('https://technical-task-api.icapgroupgmbh.com/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (res.status === 200) {
                if (typeof window !== 'undefined') {localStorage.setItem('user', 'exist')}
                set({loginResult: await res.json()});
            } else {
                set({loginResult: await res.json()});
            }
        } catch (error) {
            set({loginResult: {}});
        }
    },

    clearLoginResult: () => {
        set({loginResult: {}});
    },
});