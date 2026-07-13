import { useShallow } from "zustand/shallow";
import { Play, Square } from "lucide-react";
import { useGarageStore } from "@/store/useGarageStore";
import { PrimaryButton } from "@/components/common";
import type { Car, raceState } from "@/types";

type EngineControlsProps = {
  car: Car;
  raceState: raceState | undefined;
  isRacing: boolean;
};

export default function EngineControls({ car, raceState, isRacing }: EngineControlsProps) {
  const isDriving = raceState?.status === "driving" || raceState?.status === "starting";
  const isIdle = !raceState || raceState.status === "idle";

  const { startEngine, stopEngine } = useGarageStore(useShallow((state) => ({ startEngine: state.startEngine, stopEngine: state.stopEngine })));

  return (
    <div className="flex items-center gap-1">
      <PrimaryButton
        variant="success"
        className="px-2 py-1"
        onClick={() => {
          startEngine(car.id);
        }}
        disabled={isDriving || isRacing}
        aria-label="start engine"
      >
        <Play size={14} />
      </PrimaryButton>
      <PrimaryButton
        variant="secondary"
        className="px-2 py-1"
        onClick={() => {
          stopEngine(car.id);
        }}
        disabled={isIdle}
        aria-label="stop engine"
      >
        <Square size={14} />
      </PrimaryButton>
    </div>
  );
}
