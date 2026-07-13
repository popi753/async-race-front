import { useQueries, useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";
import { getCar, getWinners } from "@/api";
import { useGarageStore } from "@/store/useGarageStore";
import type { Car } from "@/types";
import { WINNERS_PAGE_LIMIT } from "@/constants/app";

export default function useWinnersPage() {
  const { winnersPage, setWinnersPage, sort, order } = useGarageStore(
    useShallow((s) => ({
      winnersPage: s.winnersPage,
      setWinnersPage: s.setWinnersPage,
      sort: s.sort,
      order: s.order,
      totalWinnersCount: s.totalWinnersCount,
      setTotalWinnersCount: s.setTotalWinnersCount,
    })),
  );

  const {
    data,
    isLoading: isLoadingIds,
    isError: isErrorIds,
  } = useQuery({
    queryKey: ["winners", { page: winnersPage, sort: sort, order: order }],
    queryFn: () => getWinners(winnersPage, sort, order, WINNERS_PAGE_LIMIT),
  });

  const { winnerCarsData, isLoadingCars, isErrorCars } = useQueries({
    queries:
      data?.winners.map((winner) => ({
        queryKey: ["winnerCar", winner.id],
        queryFn: () => getCar(winner.id) || {},
        retry: false,
        select: (data: Car) => {
          return { ...data, ...winner };
        },
      })) || [],
    combine: (results) => {
      return {
        winnerCarsData: results.map((result) => result.data),
        isLoadingCars: results.some((result) => result.isLoading),
        isErrorCars: results.every((result) => result.isError),
      };
    },
  });

  const isError = isErrorIds || isErrorCars;
  const isLoading = isLoadingIds || isLoadingCars;

  const winnerCarsDataFiltered = winnerCarsData.filter((car) => car !== undefined);

  return { winnersPage, setWinnersPage, winnerCarsDataFiltered, isError, isLoading, totalCount: data?.totalCount ?? 0 };
}
