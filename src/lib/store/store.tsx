import {create} from 'zustand'
import {createTableSlice, ITableSlice} from "../slices/createTableSlice";


type StoreState = ITableSlice

export const useAppStore = create<StoreState>()((...a) => ({
    ...createTableSlice(...a),
}))