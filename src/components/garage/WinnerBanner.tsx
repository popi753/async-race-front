import { createPortal } from "react-dom";
import { XIcon } from "lucide-react";
import { useWinnerBanner } from "@/hooks";
import { PrimaryButton } from "@/components/common";

export default function WinnerBanner() {
  const { winner, setWinner } = useWinnerBanner();

  if (!winner && winner !== undefined) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 pointer-events-none">
      <div className="rounded-xl border border-amber-300 bg-amber-50 p-6 text-center shadow-lg pointer-events-auto animate-bounce">
        <div className="flex justify-end">
          <PrimaryButton variant="ghost" onClick={() => setWinner(null)}>
            <XIcon className="h-5 w-5" />
          </PrimaryButton>
        </div>

        <p className="text-lg font-semibold text-amber-800">
          {winner === undefined ? "No winner for this race" : `The winner is ${winner.name} with a time of ${winner.time.toFixed(2)} seconds!`}
        </p>
      </div>
    </div>,
    document.body,
  );
}
