import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";
import { useGarageStore } from "@/store/useGarageStore";
import generateRandomCars from "@/helpers/generateRandomCars";
import type { Car } from "@/types";

export default function useRaceControls() {
  const { isRacing, page, startRace, resetRace, hasRaceStates } = useGarageStore(
    useShallow((state) => {
      return {
        isRacing: state.isRacing,
        page: state.garagePage,
        startRace: state.startRace,
        resetRace: state.resetRace,
        hasRaceStates: Object.keys(state.raceStates).length > 0,
      };
    }),
  );

  const queryClient = useQueryClient();
  const cashedGarageData = queryClient.getQueryData(["garage", { page: page }]) as { cars: Car[]; totalCount: number };

  const handleRaceStart = useCallback(() => {
    const data = queryClient.getQueryData(["garage", { page }]) as { cars: Car[]; totalCount: number };
    startRace(data.cars);
  }, [queryClient, startRace, page]);

  const handleRandomCarsGeneration = useCallback(() => {
    generateRandomCars();
    queryClient.invalidateQueries({ queryKey: ["garage", { page }] });
  }, [queryClient, page]);

  const { totalCount } = cashedGarageData;

  return { isRacing, handleRaceStart, handleRandomCarsGeneration, resetRace, hasRaceStates, totalCount };
}
