import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";
import { createCar } from "@/api";
import { useGarageStore } from "@/store/useGarageStore";

export default function useCreateCar() {
    const queryClient = useQueryClient();

    const {
        name,
        setName,
        color: carColor,
        setColor,
    } = useGarageStore(useShallow((state) => ({ name: state.name, setName: state.setName, color: state.color, setColor: state.setColor })));

    const { mutate, isPending } = useMutation({
        mutationFn: () => createCar({ name: name.trim(), color: carColor }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["garage"] });
        },
    });

    const createCarMutation = useCallback(() => {
        if (name.trim().length === 0) {
            alert("Car name is required");
        }
        if (name.length > 30) {
            alert("Car name must be less than 30 characters");
        }
        mutate();
    }, [name, mutate]);

    return { name, setName, carColor, setColor, createCarMutation, isPending };
}