import { ArrowDown, ArrowUp } from "lucide-react";
import type { SortField } from "@/types";
import { useGarageStore } from "@/store/useGarageStore";
import { useShallow } from "zustand/react/shallow";

type SortHeaderProps = {
    label: string;
    field: SortField;
};

export default function SortHeader({ label, field }: SortHeaderProps) {
    const { sort, setSort, order } = useGarageStore(useShallow((s) => ({ sort: s.sort, setSort: s.setSort, order: s.order })));

    const isActive = sort === field;
    return (
        <button
            type="button"
            onClick={() => setSort(field)}
            className={`flex items-center gap-1 transition hover:text-slate-900 ${isActive ? "text-slate-900" : "text-slate-500"}`}
        >
            {label}
            {isActive && (order === "ASC" ? <ArrowUp /> : <ArrowDown />)}
        </button>
    );
}
