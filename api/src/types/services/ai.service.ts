export interface AIService {
  generateCSVFileCharts(csvContent: string): Promise<any[]>;
  askCSVFile(csvContent: string, question: string): Promise<string>;
}
