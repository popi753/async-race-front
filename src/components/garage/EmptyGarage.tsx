import { Car as CarIcon } from "lucide-react";

export default function EmptyGarage() {
  return (
    <div className="flex flex-col items-center gap-3 py-12 text-slate-400">
      <CarIcon size={48} />
      <p className="text-lg font-medium">No Cars</p>
      <p className="text-sm">Create a car or generate 100 random ones to get started.</p>
    </div>
  );
}
