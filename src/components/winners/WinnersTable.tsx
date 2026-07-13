import { useShallow } from "zustand/shallow";
import { useGarageStore } from "@/store/useGarageStore";
import { TableHeader, WinnerRow } from "./index";
import type { Car, Winner } from "@/types";

type winnerCar = (Winner & Car) | undefined;

export default function WinnersTable({ winners }: { winners: winnerCar[] }) {
    const { winnersPage } = useGarageStore(useShallow((s) => ({ winnersPage: s.winnersPage })));

    return (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-120 text-left text-sm">
                <TableHeader />
                <tbody>
                    {winners.map((winner: winnerCar, index: number) => {
                        if (!winner) return null;
                        return <WinnerRow key={index} winner={winner} index={index} page={winnersPage} />;
                    })}
                </tbody>
            </table>
        </div>
    );
}
