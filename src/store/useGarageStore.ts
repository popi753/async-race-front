import { create } from 'zustand'
import { createGaragePageSlice, type GaragePageState } from './slices/garagePageSlice';

export const useGarageStore = create<GaragePageState>((...rest) => ({
    ...createGaragePageSlice(...rest),
}))
