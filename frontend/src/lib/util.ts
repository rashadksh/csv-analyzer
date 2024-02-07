import { CSVFileChart, CSVFileState } from '@csv-analyzer/types';

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
    id: idx,
    value: Number(value.value),
    label: value.name || value.key || '',
  }));
}
