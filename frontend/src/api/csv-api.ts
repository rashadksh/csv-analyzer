import { useMutation, useQuery, useQueryClient } from 'react-query';

import { baseAPI } from './base';

export async function getAllCSVFiles() {
  const { data } = await baseAPI.get('/csv');
  return data;
}

export async function processCSVFile(formData: FormData) {
  const { data } = await baseAPI.post(`/csv`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
}

export const GET_ALL_CSV_FILES_KEY = 'GET/csv';
export function useAllCSVFiles() {
  return useQuery([GET_ALL_CSV_FILES_KEY], getAllCSVFiles);
}

export function useProcessCSVFile() {
  const queryClient = useQueryClient();
  return useMutation((formData: FormData) => processCSVFile(formData), {
    onSuccess: () => {
      queryClient.invalidateQueries([GET_ALL_CSV_FILES_KEY]);
    },
  });
}
