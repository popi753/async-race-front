import SortHeader from "./SortHeader";

export default function TableHeader() {
  return (
    <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
      <tr>
        <th className="px-4 py-3">№</th>
        <th className="px-4 py-3">Car</th>
        <th className="px-4 py-3">Name</th>
        <th className="px-4 py-3">
          <SortHeader label="Wins" field="wins" />
        </th>
        <th className="px-4 py-3">
          <SortHeader label="Best Time" field="time" />
        </th>
      </tr>
    </thead>
  );
}
