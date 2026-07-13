import { EmptyWinners, WinnersTable, Pagination } from "@/components";
import { useWinnersPage } from "@/hooks";
import { WINNERS_PAGE_LIMIT } from "@/constants/app";

export default function WinnersPage() {
    const { winnersPage, setWinnersPage, winnerCarsDataFiltered, isError, isLoading, totalCount } = useWinnersPage();

    if (isLoading) {
        return <p className="text-sm text-slate-500">Loading...</p>;
    }

    if (isError) {
        return <p className="text-sm text-red-500">Error loading garage data.</p>;
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">
                Winners
                <span className="ml-2 text-base font-normal text-slate-500">({totalCount} winners)</span>
            </h2>

            {totalCount === 0 ? <EmptyWinners /> : <WinnersTable winners={winnerCarsDataFiltered ?? []} />}
            <Pagination
                page={winnersPage}
                totalCount={totalCount ?? 0}
                limit={WINNERS_PAGE_LIMIT}
                onPageChange={(newPage: number) => setWinnersPage(newPage)}
            />
        </div>
    );
}
