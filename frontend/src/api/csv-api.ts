import { useQuery } from 'react-query';

import { baseAPI } from './base';

export async function getAllCSVFiles() {
  const { data } = await baseAPI.get('/csv');
  return data;
}

export const GET_ALL_CSV_FILES_KEY = 'GET/csv';
export function useAllCSVFiles() {
  return useQuery([GET_ALL_CSV_FILES_KEY], getAllCSVFiles);
}
