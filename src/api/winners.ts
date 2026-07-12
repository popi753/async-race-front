import type { Winner } from '@/types';
import { request } from './client';

export function getWinner(id: number): Promise<Winner> {
  return request<Winner>({ path: `/winners/${id}` });
}

export function createWinner(payload: Winner): Promise<Winner> {
  return request<Winner>({ path: '/winners', options: { method: 'POST', body: payload } });
}

export function updateWinner(id: number, payload: { wins: number; time: number }): Promise<Winner> {
  return request<Winner>({ path: `/winners/${id}`, options: { method: 'PUT', body: payload } });
}

