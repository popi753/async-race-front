import { EmptyWinners, WinnersTable, Pagination } from "@/components";
import { useWinnersPage } from "@/hooks";
import { WINNERS_PAGE_LIMIT } from "@/constants/app";

export default function WinnersPage() {
    const { winnersPage, setWinnersPage, winnerCarsDataFiltered, isError, isLoading, totalCount } = useWinnersPage();

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">
                Winners
                <span className="ml-2 text-base font-normal text-slate-500">({totalCount} winners)</span>
            </h2>

            {isLoading ? (
                <p className="py-8 text-center text-slate-500">Loading winners...</p>
            ) : totalCount === 0 ? (
                <EmptyWinners />
            ) : isError ? (
                <p className="text-sm text-red-600">something went wrong</p>
            ) : (
                <WinnersTable winners={winnerCarsDataFiltered ?? []} />
            )}
            <Pagination
                page={winnersPage}
                totalCount={totalCount ?? 0}
                limit={WINNERS_PAGE_LIMIT}
                onPageChange={(newPage: number) => setWinnersPage(newPage)}
            />
        </div>
    );
}
