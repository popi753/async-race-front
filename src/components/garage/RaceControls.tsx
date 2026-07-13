import { Flag, RotateCcw, Shuffle } from "lucide-react";
import { PrimaryButton } from "@/components/common";
import { useRaceControls } from "@/hooks";

export default function RaceControls() {
  const { isRacing, handleRaceStart, handleRandomCarsGeneration, resetRace, hasRaceStates, totalCount } = useRaceControls();

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <PrimaryButton variant="primary" onClick={() => handleRaceStart()} disabled={isRacing || !totalCount}>
        <span className="flex items-center gap-1.5">
          <Flag size={16} /> Race
        </span>
      </PrimaryButton>
      <PrimaryButton variant="secondary" onClick={() => resetRace()} disabled={!hasRaceStates || !totalCount}>
        <span className="flex items-center gap-1.5">
          <RotateCcw size={16} /> Reset
        </span>
      </PrimaryButton>
      <PrimaryButton
        variant="secondary"
        onClick={() => {
          handleRandomCarsGeneration();
        }}
        disabled={isRacing}
      >
        <span className="flex items-center gap-1.5">
          <Shuffle size={16} /> Generate 100
        </span>
      </PrimaryButton>
    </div>
  );
}
