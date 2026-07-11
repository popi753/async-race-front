import { useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";
import { getCars } from "@/api/garage";
import { useGarageStore } from "@/store/useGarageStore";
import { GARAGE_PAGE_LIMIT } from "@/constants/app";

export default function useGaragePage() {

  const { page, setPage, setTotalCount, selectedCar } = useGarageStore(useShallow((state) => ({ page: state.garagePage, setPage: state.setGaragePage, setTotalCount: state.setTotalCount, selectedCar: state.selectedCar })));

  const { data, isLoading, isError } = useQuery({
    queryKey: ['garage', { page: page }],
    queryFn: () => getCars(page, GARAGE_PAGE_LIMIT),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { page, setPage, setTotalCount, selectedCar, data, isLoading, isError }
}