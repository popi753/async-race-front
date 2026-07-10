import { request } from './client';
import type { Car } from '@/types';
import { GARAGE_PAGE_LIMIT } from '@/constants/app';

type GetCarsResponse = {
  result: Car[];
  totalCount: number;
}

export function getCars(page: number, limit = GARAGE_PAGE_LIMIT): Promise<GetCarsResponse> {
  const query = `?_page=${page}&_limit=${limit}`;
  return request<GetCarsResponse>({path : `/garage${query}`, type : "withHeaders"}).then(({ result, totalCount }) => ({
    result,
    totalCount,
  }));
}

// export function getCar(id: number): Promise<Car> {
//   return request<Car>(`/garage/${id}`);
// }

export function createCar(payload: { name: string; color: string }): Promise<Car> {
  return request<Car>({path: '/garage', options: { method: 'POST', body: payload }});
}

// export function updateCar(id: number, payload: { name: string; color: string }): Promise<Car> {
//   return request<Car>(`/garage/${id}`, { method: 'PUT', body: payload });
// }

// export function deleteCar(id: number): Promise<void> {
//   return request<void>(`/garage/${id}`, { method: 'DELETE' });
// }
