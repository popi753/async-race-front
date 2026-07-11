import type { StateCreator } from 'zustand'
import { ApiError, startOrStopEngine, switchToDrive } from '@/api';
import type { raceState } from '@/types';
import { HTTP_SERVER_ERROR } from '@/constants/app';

export type RacingSliceState = {
  isRacing: boolean;
  setIsRacing: (isRacing: boolean) => void;

  raceStates: Record<number, raceState>;
  setRaceStates: (states: Record<number, raceState>) => void;

  startEngine: (id: number) => Promise<void>;
  stopEngine: (id: number) => Promise<void>;

  animateCar: (id: number, durationMs: number) => void;
}

export const createRacingSlice: StateCreator<RacingSliceState> = (set, get) => ({
  isRacing: false,
  setIsRacing: (isRacing: boolean) => set({ isRacing }),

  raceStates: {},
  setRaceStates: (states: Record<number, raceState>) => set({ raceStates: states }),

  startEngine: async (id: number) => {
    get().setIsRacing(true);
    set((s) => ({ raceStates: { ...s.raceStates, [id]: { id, status: 'starting', progress: 0, finishTime: null } } }));
    const { velocity, distance } = await startOrStopEngine(id, 'started');
    const durationMs = distance / velocity;
    set((s) => ({ raceStates: { ...s.raceStates, [id]: { ...s.raceStates[id], status: 'driving' } } }));
    get().animateCar(id, durationMs);
    try {
      await switchToDrive(id);
    } catch (err) {
      if (err instanceof ApiError && err.status >= HTTP_SERVER_ERROR) {
        const current = get().raceStates[id];
        set((s) => ({ raceStates: { ...s.raceStates, [id]: { ...s.raceStates[id], status: 'broken', progress: current?.progress ?? 0 } } }));
        const isRacing = Object.keys(get().raceStates).length > 0;
        get().setIsRacing(isRacing);
      }
    }
  },

  stopEngine: async (id: number) => {
    await startOrStopEngine(id, 'stopped');

    set((s) => { delete s.raceStates[id]; return { raceStates: s.raceStates } });
    const isRacing = Object.keys(get().raceStates).length > 0;

    get().setIsRacing(isRacing);
  },

  animateCar: (id: number, durationMs: number) => {
    console.log("animateCar", id, durationMs);
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationMs, 1);
      const current = get().raceStates[id];
      if (!current || current.status === 'broken' || current.status === 'idle') return;
      set((s) => ({ raceStates: { ...s.raceStates, [id]: { ...s.raceStates[id], progress } } }));
      if (progress >= 1) {
        set((s) => ({ raceStates: { ...s.raceStates, [id]: { ...s.raceStates[id], status: 'finished', finishTime: durationMs / 1000 } } }));
        return;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  },
})