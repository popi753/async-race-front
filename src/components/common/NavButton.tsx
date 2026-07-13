import { cn } from "@/helpers";
import type { JSX } from "react/jsx-runtime";

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: JSX.Element;
  label: string;
}

export default function NavButton({ active, onClick, icon, label }: NavButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn("flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition text-slate-600 ", {
        "bg-blue-600 text-white": active,
        "hover:bg-slate-100": !active,
      })}
    >
      {icon} {label}
    </button>
  );
}
