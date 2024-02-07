import { CSVFileChart, CSVFileState } from '@csv-analyzer/types';
import { GridColDef } from '@mui/x-data-grid';

export function getCSVFileProcessingProgress(state: CSVFileState): number {
  switch (state) {
    case CSVFileState.UPLOADED:
      return 20;
    case CSVFileState.PARSING:
      return 40;
    case CSVFileState.DONE_PARSING:
      return 50;
    case CSVFileState.ANALYZING:
      return 70;
    case CSVFileState.DONE:
      return 100;
    default:
      return 0;
  }
}

export function getCSVFileStateText(state: CSVFileState): string {
  switch (state) {
    case CSVFileState.UPLOADED:
      return 'Upload done';
    case CSVFileState.PARSING:
      return 'Parsing';
    case CSVFileState.DONE_PARSING:
      return 'Parsing done';
    case CSVFileState.ANALYZING:
      return 'Analyzing';
    case CSVFileState.DONE:
      return 'Ready';
    default:
      return '';
  }
}

export function transformCSVFileChartIntoPieChartData(chart: CSVFileChart) {
  return chart.values.map((value, idx) => ({
    id: `${idx}`,
    value: Number(value.value),
    label: value.name || value.key || '',
  }));
}

export function getCSVFileChartLabels(chart: CSVFileChart) {
  return chart.values.map((value) => value.key || value.name || '');
}

export function getCSVFileChartValues(chart: CSVFileChart) {
  return chart.values.map((value) => value.value);
}

export function transformCSVRowIntoDataGridColumns(row: object): GridColDef[] {
  return Object.keys(row)
    .filter((key) => !['_id', 'fileId'].includes(key))
    .map((key) => ({
      field: key,
      headerName: toTitleCase(key),
      width: 200,
    }));
}

export function toTitleCase(str: string): string {
  // Convert snake_case to title case
  if (str.includes('_')) {
    return str
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  // Convert kebab-case to title case
  if (str.includes('-')) {
    return str
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  // Convert camelCase to title case
  if (str.match(/[A-Z]/) && str.match(/[a-z]/)) {
    return str.replace(/^[a-z]|[A-Z]/g, (match, index) =>
      index === 0 ? match.toUpperCase() : ' ' + match.toUpperCase()
    );
  }
  // If already in title case, return as is
  return str;
}
