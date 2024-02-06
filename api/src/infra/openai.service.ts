import OpenAI from 'openai';
import { Injectable } from '@nestjs/common';

import { AIService } from '../types/services/ai.service';
import { ConfigService } from './config.service';

@Injectable()
export class OpenAIService implements AIService {
  private client: OpenAI;

  private generateChartsPrompt = `
You will be provided with random csv data. The first row will represent the csv header. The other rows will represent the data.
Some of the columns will represent description text, others will represent statistical data like price of a product or marks of a student.
Your task is to provide 4 metrics from the data like average, total, count, max 5, min 5 or any other aggregation function then you will return these metrics as a json array.
Each array item will contain title of the metrics you generated, its type (number, pie, line, bar) and values which will be an array of two fields, key and value.
An example output would be: [{"title":"Total sold by category","type":"pie","values":[{"name":'Electronics',"value": 10}]}]
  `;

  constructor(configService: ConfigService) {
    this.client = new OpenAI({
      apiKey: configService.getOpenAIKey(),
    });
  }

  async generateCSVFileCharts(csvContent: string): Promise<any[]> {
    const response = await this.client.chat.completions.create({
      model: 'gpt-3.5-turbo-16k',
      messages: [
        {
          role: 'system',
          content: this.generateChartsPrompt,
        },
        {
          role: 'user',
          content: csvContent,
        },
      ],
      temperature: 1,
      top_p: 1,
    });

    return JSON.parse(response.choices[0].message.content);
  }
}
