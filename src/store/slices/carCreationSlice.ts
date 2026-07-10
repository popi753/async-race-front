import type { StateCreator } from 'zustand'

export type CarSliceState = {
  name: string;
  setName: (newName: string) => void;
  color: string;
  setColor: (newColor: string) => void;
}

export const createCarCreationSlice: StateCreator<CarSliceState> = (set) => ({
  name: '',
  setName: (newName: string) => {set({ name: newName })},
  color: '#ffffff',
  setColor: (newColor: string) => set({ color: newColor }),
})