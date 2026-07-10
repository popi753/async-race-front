import { create } from 'zustand'
import { createGaragePageSlice, type GaragePageState } from './slices/garagePageSlice';
import { createCarCreationSlice, type CarSliceState } from './slices/carCreationSlice';

export const useGarageStore = create<GaragePageState & CarSliceState>((...rest) => ({
    ...createGaragePageSlice(...rest),
    ...createCarCreationSlice(...rest),
}))
