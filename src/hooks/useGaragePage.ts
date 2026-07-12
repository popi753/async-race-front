import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";
import { getCars } from "@/api/garage";
import { useGarageStore } from "@/store/useGarageStore";
import { GARAGE_PAGE_LIMIT } from "@/constants/app";

export default function useGaragePage() {

  const { page, setPage, setTotalCount, selectedCar, winner } = useGarageStore(useShallow((state) => ({ page: state.garagePage, setPage: state.setGaragePage, setTotalCount: state.setTotalCount, selectedCar: state.selectedCar, winner: state.winner })));

  const { data, isLoading } = useQuery({
    queryKey: ['garage', { page: page }],
    queryFn: () => getCars(page, GARAGE_PAGE_LIMIT),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (winner) {
      alert(`The winner is ${winner.name} with a time of ${winner.time.toFixed(2)} seconds!`);
    } else if (winner === undefined) {
      alert(`No winner for this race!`);
    }
    return () => {
      useGarageStore.setState({ winner: null });
    };
  }, [winner])

  useEffect(() => {
    setTotalCount(data?.totalCount || 0);

  }, [data, setTotalCount]);

  return { page, setPage, selectedCar, data, isLoading }
}