import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PrimaryButton } from "./index";

interface PaginationProps {
  page: number;
  totalCount: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalCount, limit, onPageChange }: PaginationProps) {
  const totalPages = useMemo(() => Math.max(1, Math.ceil(totalCount / limit)), [totalCount, limit]);
  if (totalPages <= 1 && totalCount <= limit) return null;
  return (
    <div className="flex items-center gap-2">
      <PrimaryButton variant="secondary" disabled={page <= 1} onClick={() => onPageChange(page - 1)} aria-label="previous page">
        <ChevronLeft size={16} />
      </PrimaryButton>
      <span className="text-sm text-slate-600">
        Page <span className="font-semibold text-slate-800">{page}</span> / {totalPages}
      </span>
      <PrimaryButton variant="secondary" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} aria-label="next page">
        <ChevronRight size={16} />
      </PrimaryButton>
    </div>
  );
}
