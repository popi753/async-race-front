import type { InputHTMLAttributes } from "react";
import { cn } from "@/helpers";

type ColorInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export default function ColorInput({ label, className = "", ...rest }: ColorInputProps) {
  return (
    <label className="flex flex-col gap-1">
      {label && <span className="text-xs font-medium text-slate-500">{label}</span>}
      <input type="color" {...rest} className={cn("h-9 w-12 cursor-pointer rounded-md border border-slate-300 bg-white p-0.5", className)} />
    </label>
  );
}
