import { RaceTrack, CarControls, EngineControls } from "@/components";
import { useGarageStore } from "@/store/useGarageStore";
import type { Car } from "@/types";

export default function CarCard({ car }: { car: Car }) {
    const { raceState, isRacing } = useGarageStore((state) => ({raceState : state.raceStates[car.id], isRacing : state.raceStates[car.id]?.status === "driving" || state.raceStates[car.id]?.status === "starting"}));

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="mb-2 flex items-center justify-between gap-2">
                <CarControls car={car} />
                <EngineControls car={car} raceState={raceState} isRacing={isRacing} />
            </div>
            <RaceTrack color={car.color} raceState={raceState} />
        </div>
    );
}
