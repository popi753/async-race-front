import type { StateCreator } from "zustand";

export type GaragePageState = {
  garagePage: number;
  setGaragePage: (newPage: number) => void;
  totalCount: number;
  setTotalCount: (newTotalCount: number) => void;
};

export const createGaragePageSlice: StateCreator<GaragePageState> = (set) => ({
  garagePage: 1,
  setGaragePage: (newPage) => set({ garagePage: newPage }),
  totalCount: 0,
  setTotalCount: (newTotalCount) => set({ totalCount: newTotalCount }),
});
