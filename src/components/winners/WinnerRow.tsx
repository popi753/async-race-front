import { CarIcon } from "@/components";
import { formatTime } from "@/helpers";
import type { Car, Winner } from "@/types";
import { WINNERS_PAGE_LIMIT } from "@/constants/app";

export interface WinnerRowProps {
    winner: Winner & Car;
    index: number;
    page: number;
}

export default function WinnerRow({ winner, index, page }: WinnerRowProps) {
    const number = (page - 1) * WINNERS_PAGE_LIMIT + index + 1;

    return (
        <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
            <td className="px-4 py-3 text-slate-500">{number}</td>
            <td className="px-4 py-3">
                {winner?.color ? <CarIcon color={winner.color} className="h-8 w-16" /> : <span className="text-slate-300">—</span>}
            </td>
            <td className="px-4 py-3 font-medium text-slate-700">{winner?.name ?? `unknown`}</td>
            <td className="px-4 py-3 text-slate-700">{winner?.wins}</td>
            <td className="px-4 py-3 text-slate-700">{winner?.time ? formatTime(winner.time) : "—"}</td>
        </tr>
    );
}
