import { Trophy } from "lucide-react";

export default function EmptyWinners() {
  return (
    <div className="flex flex-col items-center gap-3 py-12 text-slate-400">
      <Trophy size={48} />
      <p className="text-lg font-medium">No Winners Yet</p>
      <p className="text-sm">Start a race in the Garage to see winners here.</p>
    </div>
  );
}
