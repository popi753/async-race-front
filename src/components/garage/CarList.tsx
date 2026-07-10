import { EmptyGarage, CarCard } from "./index";
import type { Car } from "@/types";

type CarListProps = {
    cars: Car[];
};

export default function CarList({ cars }: CarListProps) {
    if (cars.length === 0) return <EmptyGarage />;
    return (
        <div className="space-y-3">
            {cars.map((car) => (
                <CarCard key={car.id} car={car} />
            ))}
        </div>
    );
}
