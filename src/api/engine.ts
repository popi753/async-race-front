import { request } from "./client";
import type { EngineState, EngineStatus } from "@/types";

export function startOrStopEngine(id: number, status: EngineStatus): Promise<EngineState> {
  return request<EngineState>({
    path: `/engine?id=${id}&status=${status}`,
    options: {
      method: "PATCH",
    },
  });
}

type DriveResult = {
  success: boolean;
};

export function switchToDrive(id: number): Promise<DriveResult> {
  return request<DriveResult>({ path: `/engine?id=${id}&status=drive`, options: { method: "PATCH" } });
}
