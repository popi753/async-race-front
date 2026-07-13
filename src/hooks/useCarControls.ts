import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";
import { useGarageStore } from "@/store/useGarageStore";
import { deleteCar, deleteWinner } from "@/api";
import type { Car } from "@/types";

export default function useCarControls() {
  const { garagePage, selectedCar, selectCar } = useGarageStore(
    useShallow((state) => ({ garagePage: state.garagePage, selectedCar: state.selectedCar, selectCar: state.selectCar })),
  );

  const queryClient = useQueryClient();

  const { mutate: deleteCarMutation } = useMutation({
    mutationFn: async (id: number) => {
      await deleteCar(id);
      await deleteWinner(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["garage"] });
      const data = queryClient.getQueryData(["garage", { page: garagePage }]) as { cars: Car[]; totalCount: number };
      if (data.cars.length === 1 || data.cars.length <= 1) {
        useGarageStore.setState({ garagePage: Math.max(1, garagePage - 1) });
      }
    },
  });

  return { selectedCar, selectCar, deleteCarMutation };
}
