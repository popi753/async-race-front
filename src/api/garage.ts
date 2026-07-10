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

