import { MS_PER_SECOND } from "@/constants/app";
import { useGarageStore } from "@/store/useGarageStore";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

export default function useWinnerBanner() {
    const { winner, setWinner } = useGarageStore(
        useShallow((state) => ({
            winner: state.winner,
            setWinner: state.setWinner,
        })),
    );

    useEffect(() => {
        if (winner || winner === undefined) {
            const timer = setTimeout(() => {
                setWinner(null);
            }, 3 * MS_PER_SECOND);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [winner, setWinner]);

    return { winner, setWinner };
}