import {StateCreator} from "zustand";
import {IAuth} from "../../models/interfaces";

export interface IAuthSlice {
    loginResult: any | {};
    fetchLogin: (data: IAuth) => void;
    removeUserData: () => void;
}

export const createAuthSlice: StateCreator<IAuthSlice> = (set) => ({
    loginResult: {},
    fetchLogin: async (data) => {
        try {
            const res = await fetch('https://technical-task-api.icapgroupgmbh.com/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (res.status === 200) {
                window.localStorage.setItem('user', 'exist');
                set({loginResult: await res.json()});
            } else {
                set({loginResult: await res.json()});
            }
        } catch (error) {
            set({loginResult: {}});
        }
    },

    removeUserData: () => {
        set({loginResult: {}});
    },
});