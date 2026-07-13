import { create } from 'zustand'
import { createGaragePageSlice, type GaragePageState } from './slices/garagePageSlice';
import { createCarCreationSlice, type CarSliceState } from './slices/carCreationSlice';
import { createEditCarSlice, type EditCarSliceState } from './slices/editCarSlice';
import { createRacingSlice, type RacingSliceState } from './slices/racingSlice';
import { createWinnersPageSlice, type WinnersPageState } from './slices/winnersPageSlice';

export const useGarageStore = create<GaragePageState & CarSliceState & EditCarSliceState & RacingSliceState & WinnersPageState>((...rest) => ({
    ...createGaragePageSlice(...rest),
    ...createCarCreationSlice(...rest),
    ...createEditCarSlice(...rest),
    ...createRacingSlice(...rest),
    ...createWinnersPageSlice(...rest),
}))
