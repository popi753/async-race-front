import type { InputHTMLAttributes } from "react";
import { cn } from "@/helpers";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
};

export default function TextInput({ label, className = "", ...rest }: TextInputProps) {
    return (
        <label className="flex flex-col gap-1">
            {label && <span className="text-xs font-medium text-slate-500">{label}</span>}
            <input
                {...rest}
                className={cn(
                    "rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
                    className,
                )}
            />
        </label>
    );
}
