import { useGaragePage } from "@/hooks";
import { CreateCarPanel, UpdateCarPanel, CarList, Pagination, RaceControls } from "@/components";
import { GARAGE_PAGE_LIMIT } from "@/constants/app";

export default function GaragePage() {
    const { page, setPage, selectedCar, data, isLoading, isError } = useGaragePage();

    if (isLoading) {
        return <p className="text-sm text-slate-500">Loading...</p>;
    }

    if (isError) {
        return <p className="text-sm text-red-500">Error loading garage data.</p>;
    }


    return (
        <div className="flex flex-col space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">
                Garage
                <span className="ml-2 text-base font-normal text-slate-500">
                    ({data?.totalCount ? `${data.totalCount} cars` : "There are no cars in the garage"})
                </span>
            </h2>
            <div className="flex">
                <CreateCarPanel />
                {selectedCar && <UpdateCarPanel />}
            </div>

            <RaceControls />

            <CarList cars={data?.cars || []} />

            <Pagination
                page={page}
                totalCount={data?.totalCount || 0}
                limit={GARAGE_PAGE_LIMIT}
                onPageChange={(newPage: number) => {
                    setPage(newPage);
                }}
            />
        </div>
    );
}
