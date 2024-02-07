import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AskCSVFileDTO, CSVFileModel, CSVFileState } from '@csv-analyzer/types';

import { baseAPI } from './base';

export async function getAllCSVFiles() {
  const { data } = await baseAPI.get<CSVFileModel[]>('/csv');
  return data;
}

export async function getCSVFileById(id: string) {
  const { data } = await baseAPI.get<{ file: CSVFileModel; rows: any[] }>(
    `/csv/${id}`
  );
  return data;
}

export async function processCSVFile(formData: FormData) {
  const { data } = await baseAPI.post<CSVFileModel>(`/csv`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
}

export async function askCSVFileById(id: string, dto: AskCSVFileDTO) {
  const { data } = await baseAPI.post<{ answer: string }>(
    `/csv/${id}/ask`,
    dto
  );
  return data;
}

export const GET_ALL_CSV_FILES_KEY = 'GET/csv';
export function useAllCSVFiles() {
  return useQuery([GET_ALL_CSV_FILES_KEY], getAllCSVFiles);
}

export const GET_CSV_FILE_BY_ID_KEY = 'GET/csv/:id';
export function useCSVFileById(id: string) {
  const REFETCH_INTERVAL = 3000;
  const [refetchInterval, setRefetchInterval] = useState(0);

  return useQuery([GET_CSV_FILE_BY_ID_KEY, id], () => getCSVFileById(id), {
    enabled: typeof id === 'string',
    refetchInterval: refetchInterval,
    onSuccess: (data) => {
      if (![CSVFileState.DONE, CSVFileState.FAILED].includes(data.file.state)) {
        setRefetchInterval(REFETCH_INTERVAL);
      } else {
        setRefetchInterval(0);
      }
    },
  });
}

export function useProcessCSVFile() {
  const queryClient = useQueryClient();
  return useMutation((formData: FormData) => processCSVFile(formData), {
    onSuccess: () => {
      queryClient.invalidateQueries([GET_ALL_CSV_FILES_KEY]);
    },
  });
}

export function useAskCSVFileById(id: string) {
  return useMutation((dto: AskCSVFileDTO) => askCSVFileById(id, dto));
}
