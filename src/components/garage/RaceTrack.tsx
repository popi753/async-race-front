import { CarIcon } from "@/components";
import { cn } from "@/helpers";
import type { raceState } from "@/types";
import { RACE_TRACK_LENGTH_PERCENT } from "@/constants/app";

type RaceTrackProps = {
    color: string;
    raceState: raceState | undefined;
};

export default function RaceTrack({ color, raceState }: RaceTrackProps) {
    const progress = raceState?.progress ?? 0;
    const offset = progress * RACE_TRACK_LENGTH_PERCENT;
    const isBroken = raceState?.status === "broken";
    const isFinished = raceState?.status === "finished";

    return (
        <div className="relative h-16 w-full overflow-hidden rounded-lg bg-linear-to-r from-slate-800/40 to-slate-700/30">
            <div className="absolute bottom-0 h-1.5 w-full bg-slate-500/40" />
            <div
                className="absolute bottom-1 transition-none w-[12%] min-w-15"
                style={{
                    left: `${offset}%`,
                    transform: "translateX(0)",
                }}
            >
                <CarIcon
                    color={color}
                    className={cn("opacity-100", {
                        "animate-pulse opacity-50": isBroken,
                        "opacity-100": isFinished,
                    })}
                />
                {isBroken && <span className="absolute -top-1 right-0 text-lg">💥</span>}
            </div>
            <div className="absolute right-1 top-1/2 -translate-y-1/2 text-2xl text-slate-400/60">🏁</div>
        </div>
    );
}
