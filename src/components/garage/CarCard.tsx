import { RaceTrack, CarControls } from "@/components/garage";
import type { Car } from "@/types";

export default function CarCard({ car }: { car: Car }) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="mb-2 flex items-center justify-between gap-2">
                <CarControls car={car} />
            </div>
            <RaceTrack color={car.color} />
        </div>
    );
}
