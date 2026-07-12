import type { StateCreator } from 'zustand'
import { ApiError, startOrStopEngine, switchToDrive } from '@/api';
import { saveWinner } from '@/helpers';
import { HTTP_SERVER_ERROR, MS_PER_SECOND } from '@/constants/app';
import type { Car, Winner } from '@/types';

type raceState = {
  id: number;
  status: 'idle' | 'starting' | 'driving' | 'stopped' | 'broken' | 'finished';
  progress: number;
  finishTime: number | null;
}

export type RacingSliceState = {
  isRacing: boolean;
  setIsRacing: (isRacing: boolean) => void;

  raceStates: Record<number, raceState>;
  setRaceStates: (states: Record<number, raceState>) => void;

  startEngine: (id: number) => Promise<void>;
  stopEngine: (id: number) => Promise<void>;

  animateCar: (id: number, durationMs: number) => void;

  startRace: (cars: Car[]) => Promise<void>;
  resetRace: () => void;

  winner: Winner | null | undefined;
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
        // const isRacing = Object.values(get().raceStates).some((state) => state.status === 'driving' || state.status === 'starting');
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

  startRace: async (cars: Car[]) => {

    set(() => ({ isRacing: true, winner: null, raceStates: {} }));
    const states: Record<number, raceState> = {};
    cars.forEach((car) => {
      states[car.id] = { id: car.id, status: 'starting', progress: 0, finishTime: null };
    });
    set(() => ({ raceStates: { ...states } }));

    const drives = cars.map(async (car: Car) => {
      const id = car.id;
      get().setIsRacing(true);
      set((s) => ({ raceStates: { ...s.raceStates, [id]: { id, status: 'starting', progress: 0, finishTime: null } } }));
      const { velocity, distance } = await startOrStopEngine(id, 'started');
      const durationMs = distance / velocity;
      set((s) => ({ raceStates: { ...s.raceStates, [id]: { ...s.raceStates[id], status: 'driving' } } }));
      get().animateCar(id, durationMs);
      try {
        await switchToDrive(id);
        return { car, time: durationMs / MS_PER_SECOND, finished: true };
      } catch (err) {
        if (err instanceof ApiError && err.status >= HTTP_SERVER_ERROR) {
          const current = get().raceStates[id];
          set((s) => ({ raceStates: { ...s.raceStates, [id]: { ...s.raceStates[id], status: 'broken', progress: current?.progress ?? 0 } } }));
          const isRacing = Object.keys(get().raceStates).length > 0;
          get().setIsRacing(isRacing);
        }
        return { car, time: Infinity, finished: false };
      }
    });

    const results = await Promise.all(drives);
    const winner = results.filter((r) => r.finished).sort((a, b) => a.time - b.time)[0];

    if (get().isRacing && Object.keys(get().raceStates).length > 0) {

      if (winner) {
        set(() => ({ winner: { id: winner.car.id, name: winner.car.name, time: winner.time } }));
        await saveWinner(winner.car.id, winner.time);
      } else {
        set(() => ({ winner: undefined }));;
      }
    }

    set(() => ({ isRacing: false }));

  },

  resetRace: async () => {
    const states = get().raceStates;
    const ids = Object.keys(states).map(Number);
    await Promise.all(ids.map((id) => startOrStopEngine(id, 'stopped').catch((e) => console.error(`Failed to stop engine for car ${id}:`, e))));
    set(() => ({ raceStates: {}, isRacing: false, winner: null }));
  },

  winner: null,
})