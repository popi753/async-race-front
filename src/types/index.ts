export type responseWithHeaders<T> = {
  result: T;
  totalCount: number;
}

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
  wins : number,
  time : number,
}

export type WinnerCar = {
  id: number,
  name: string,
  time: number,
}

export type SortField =  'wins' | 'time' | "";
export type SortOrder = 'ASC' | 'DESC' | "";
