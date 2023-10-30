import {create} from 'zustand'
import {createLoginSlice, ILoginSlice} from "../slices/createLoginSlice";
import {createTableSlice, ITableSlice} from "../slices/createTableSlice";


type StoreState = ILoginSlice & ITableSlice

export const useAppStore = create<StoreState>()((...a) => ({
    ...createLoginSlice(...a),
    ...createTableSlice(...a),
}))