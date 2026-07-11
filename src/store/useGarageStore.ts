import { create } from 'zustand'
import { createGaragePageSlice, type GaragePageState } from './slices/garagePageSlice';
import { createCarCreationSlice, type CarSliceState } from './slices/carCreationSlice';
import { createEditCarSlice, type EditCarSliceState } from './slices/editCarSlice';

export const useGarageStore = create<GaragePageState & CarSliceState & EditCarSliceState>((...rest) => ({
    ...createGaragePageSlice(...rest),
    ...createCarCreationSlice(...rest),
    ...createEditCarSlice(...rest),
}))
