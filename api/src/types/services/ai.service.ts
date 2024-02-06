export interface AIService {
  generateCSVFileCharts(csvContent: string): Promise<any[]>;
}
