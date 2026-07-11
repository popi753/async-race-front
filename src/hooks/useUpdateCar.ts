import { updateCar } from "@/api";
import { useGarageStore } from "@/store/useGarageStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";

export default function useUpdateCar() {
      
      const {selectedCar, selectCar, setSelectedCarName, setSelectedCarColor} = useGarageStore(useShallow((state) => ({selectedCar: state.selectedCar, selectCar: state.selectCar, setSelectedCarName: state.setSelectedCarName, setSelectedCarColor: state.setSelectedCarColor})))
      
      const disabled = !selectedCar;
      const queryClient = useQueryClient();
    
      const {mutate: updateCarMutation} = useMutation({
        mutationFn: () => updateCar(selectedCar?.id || NaN, { name: selectedCar?.name.trim() || '', color: selectedCar?.color || '#ffffff' }),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['garage'] });
        }
    
      })
    
      return {selectedCar, selectCar, setSelectedCarName, setSelectedCarColor, disabled, updateCarMutation}
}