import useGaragePage from "@/hooks/useGaragePage";

export default function GaragePage() {
    const { data, isLoading } = useGaragePage();

    if (isLoading) {
        return <p className="text-sm text-slate-500">Loading...</p>;
    }

    return (
        <div className="flex flex-col space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">
                Garage
                <span className="ml-2 text-base font-normal text-slate-500">
                    ({data?.totalCount ? `${data.totalCount} cars` : "There are no cars in the garage"})
                </span>
            </h2>
        </div>
    );
}
