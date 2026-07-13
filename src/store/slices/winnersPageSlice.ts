import type { StateCreator } from "zustand";
import type { SortOrder, SortField } from "@/types";

export type WinnersPageState = {
  winnersPage: number;
  setWinnersPage: (newPage: number) => void;

  sort: SortField;
  setSort: (newSort: SortField) => void;

  order: SortOrder;

  totalWinnersCount: number;
  setTotalWinnersCount: (newTotalCount: number) => void;
};

export const createWinnersPageSlice: StateCreator<WinnersPageState> = (set, get) => ({
  winnersPage: 1,
  setWinnersPage: (newPage) => set({ winnersPage: newPage }),
  sort: "",
  setSort: (newSort) => {
    const currentOrder = get().order;
    set({
      sort: newSort,
      order: currentOrder === "ASC" ? "DESC" : "ASC",
    });
  },
  order: "ASC",
  totalWinnersCount: 0,
  setTotalWinnersCount: (newTotalCount) => set({ totalWinnersCount: newTotalCount }),
});
