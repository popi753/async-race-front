import { CarIcon } from "./index";

type RaceTrackProps = {
    color: string;
};

export default function RaceTrack({ color }: RaceTrackProps) {
    return (
        <div className="relative h-16 w-full overflow-hidden rounded-lg bg-linear-to-r from-slate-800/40 to-slate-700/30">
            <div className="absolute bottom-0 h-1.5 w-full bg-slate-500/40" />
            <div
                className="absolute bottom-1 transition-none w-[12%] min-w-15"
                style={{
                    transform: "translateX(0)",
                }}
            >
                <CarIcon color={color} className="opacity-100" />
            </div>
            <div className="absolute right-1 top-1/2 -translate-y-1/2 text-2xl text-slate-400/60">🏁</div>
        </div>
    );
}
