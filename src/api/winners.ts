import type { responseWithHeaders, SortField, SortOrder, Winner } from '@/types';
import { request } from './client';
import { WINNERS_PAGE_LIMIT } from '@/constants/app';

export function getWinner(id: number): Promise<Winner> {
  return request<Winner>({ path: `/winners/${id}` });
}
type GetWinnersResponse = {
  winners: Winner[];
  totalCount: number;
}

export function getWinners(
  page: number,
  sort: SortField,
  order: SortOrder,
  limit = WINNERS_PAGE_LIMIT,
): Promise<GetWinnersResponse> {
  const query = `?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`;
  return request<responseWithHeaders<Winner[]>>({ path: `/winners${query}`, type: 'withHeaders' }).then(({ result, totalCount }) => ({
    winners: result,
    totalCount,
  }));
}

export function createWinner(payload: Winner): Promise<Winner> {
  return request<Winner>({ path: '/winners', options: { method: 'POST', body: payload } });
}

export function updateWinner(id: number, payload: { wins: number; time: number }): Promise<Winner> {
  return request<Winner>({ path: `/winners/${id}`, options: { method: 'PUT', body: payload } });
}

