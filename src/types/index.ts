export type Car = {
    id: number;
    name: string;
    color: string;
}

export type raceState = {
  id: number;
  status: 'idle' | 'starting' | 'driving' | 'stopped' | 'broken' | 'finished';
  progress: number;
  finishTime: number | null;
}

export type EngineStatus = 'started' | 'stopped' | 'drive';

export type EngineState = {
  velocity: number;
  distance: number;
}

export type Winner = {
  id : number,
  name : string,
  time : number,
}