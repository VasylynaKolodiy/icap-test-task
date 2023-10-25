import {create} from 'zustand'
import {createAuthSlice, IAuthSlice} from "../slices/createAuthSlice";
import {createTableSlice, ITableSlice} from "../slices/createTableSlice";


type StoreState = IAuthSlice & ITableSlice

export const useAppStore = create<StoreState>()((...a) => ({
    ...createAuthSlice(...a),
    ...createTableSlice(...a),
}))