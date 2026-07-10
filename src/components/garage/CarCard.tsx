import { RaceTrack } from "@/components/garage";
import type { Car } from "@/types";

export default function CarCard({ car }: { car: Car }) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <RaceTrack color={car.color} />
        </div>
    );
}
