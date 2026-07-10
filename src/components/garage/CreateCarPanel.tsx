import { PrimaryButton, TextInput, ColorInput } from "@/components/common";
import { useCreateCar } from "@/hooks";

export default function CreateCarPanel() {
    const { name, setName, carColor, setColor, createCarMutation, isPending } = useCreateCar();

    return (
        <div className="flex-1 flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Create Car</h3>
            <div className="flex justify-center items-end gap-3">
                <TextInput label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Car name" maxLength={50} />
                <ColorInput label="Color" value={carColor} onChange={(e) => setColor(e.target.value)} />
                <PrimaryButton onClick={() => createCarMutation()} disabled={isPending}>
                    Create
                </PrimaryButton>
            </div>
        </div>
    );
}
