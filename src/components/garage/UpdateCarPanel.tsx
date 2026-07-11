import { useUpdateCar } from "@/hooks";
import { PrimaryButton, TextInput, ColorInput } from "@/components/common";

export default function UpdateCarPanel() {
    const { selectedCar, selectCar, setSelectedCarName, setSelectedCarColor, disabled, updateCarMutation } = useUpdateCar();

    return (
        <div className="flex-1 flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                Update Car {selectedCar?.id !== null && <span className="text-blue-600">#{selectedCar?.id}</span>}
            </h3>
            <div className="flex justify-center items-end gap-3">
                <TextInput
                    label="Name"
                    value={selectedCar?.name || ""}
                    onChange={(e) => setSelectedCarName(e.target.value)}
                    placeholder="Edit a Car"
                    maxLength={50}
                    disabled={disabled}
                />
                <ColorInput
                    label="Color"
                    value={selectedCar?.color || "#ffffff"}
                    onChange={(e) => setSelectedCarColor(e.target.value)}
                    disabled={disabled}
                />
                <PrimaryButton
                    onClick={() => {
                        updateCarMutation();
                        selectCar(null);
                    }}
                    disabled={disabled}
                    variant="success"
                >
                    Update
                </PrimaryButton>
                {!disabled && (
                    <PrimaryButton onClick={() => selectCar(null)} variant="ghost">
                        Cancel
                    </PrimaryButton>
                )}
            </div>
        </div>
    );
}
