import { request } from "./client";
import type { Car, responseWithHeaders } from "@/types";
import { GARAGE_PAGE_LIMIT } from "@/constants/app";

type GetCarsResponse = {
  cars: Car[];
  totalCount: number;
};

export function getCar(id: number): Promise<Car> {
  return request<Car>({ path: `/garage/${id}` });
}

export function getCars(page: number, limit = GARAGE_PAGE_LIMIT): Promise<GetCarsResponse> {
  const query = `?_page=${page}&_limit=${limit}`;
  return request<responseWithHeaders<Car[]>>({ path: `/garage${query}`, type: "withHeaders" }).then(({ result, totalCount }) => ({
    cars: result,
    totalCount,
  }));
}

export function createCar(payload: { name: string; color: string }): Promise<Car> {
  return request<Car>({ path: "/garage", options: { method: "POST", body: payload } });
}

export function updateCar(id: number, payload: { name: string; color: string }): Promise<Car> {
  return request<Car>({ path: `/garage/${id}`, options: { method: "PUT", body: payload } });
}

export function deleteCar(id: number): Promise<void> {
  return request<void>({ path: `/garage/${id}`, options: { method: "DELETE" } });
}
