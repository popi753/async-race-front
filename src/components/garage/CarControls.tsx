import { Pencil, Trash2 } from "lucide-react";
import { useCarControls } from "@/hooks";
import { PrimaryButton } from "@/components/common";
import { cn } from "@/helpers";
import type { Car } from "@/types";

export default function CarControls({ car }: { car: Car }) {
    const { selectedCar, selectCar, deleteCarMutation } = useCarControls();

    return (
        <div className="flex items-center gap-2">
            <PrimaryButton
                variant="secondary"
                className="px-2 py-1"
                onClick={() => {
                    selectCar(car);
                }}
                aria-label="edit car"
                title="Edit Car"
            >
                <Pencil size={14} />
            </PrimaryButton>
            <PrimaryButton
                variant="danger"
                className="px-2 py-1"
                onClick={() => deleteCarMutation(car.id)}
                aria-label="delete car"
                title="Delete Car"
            >
                <Trash2 size={14} />
            </PrimaryButton>
            <span className={cn("truncate text-sm font-medium text-slate-700", { "text-blue-600": selectedCar?.id === car.id })}>{car.name}</span>
        </div>
    );
}
