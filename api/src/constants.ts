import path from 'path';

export const FILE_UPLOAD_DESTINATION = path.resolve(
  __dirname,
  '..',
  '..',
  'uploads'
);

export const CSV_PARSING_QUEUE_NAME = 'csv-parser';
export const CSV_ANALYZING_QUEUE_NAME = 'csv-analyzer';