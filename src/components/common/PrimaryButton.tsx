import { cn } from "@/helpers";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost" | "success";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
    children: ReactNode;
};

const variantClasses: Record<Variant, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700",
    secondary: "bg-slate-200 text-slate-800 hover:bg-slate-300 active:bg-slate-400",
    danger: "bg-red-600 text-white hover:bg-red-500 active:bg-red-700",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
    success: "bg-emerald-600 text-white hover:bg-emerald-500 active:bg-emerald-700",
};

export default function PrimaryButton({ variant = "primary", className = "", children, ...rest }: ButtonProps) {
    return (
        <button
            {...rest}
            className={cn(
                `rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-40`,
                variantClasses[variant],
                className,
            )}
        >
            {children}
        </button>
    );
}
