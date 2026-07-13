import type { StateCreator } from "zustand";
import type { Car } from "@/types";

export type EditCarSliceState = {
  selectedCar: Car | null;
  selectCar: (car: Car | null) => void;
  setSelectedCarName: (name: string) => void;
  setSelectedCarColor: (color: string) => void;
};

export const createEditCarSlice: StateCreator<EditCarSliceState> = (set) => ({
  selectedCar: null,
  selectCar: (car: Car | null) => set({ selectedCar: car }),
  setSelectedCarName: (name: string) =>
    set((state) => {
      if (state.selectedCar) {
        return { selectedCar: { ...state.selectedCar, name } };
      }
      return { selectedCar: null };
    }),
  setSelectedCarColor: (color: string) =>
    set((state) => {
      if (state.selectedCar) {
        return { selectedCar: { ...state.selectedCar, color } };
      }
      return { selectedCar: null };
    }),
});
