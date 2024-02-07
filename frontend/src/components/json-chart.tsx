import styled from '@emotion/styled';
import { CSVFileChart } from '@csv-analyzer/types';

export interface JsonChartProps {
  chart: CSVFileChart;
}

const StylePre = styled.pre`
  max-height: 300;
  overflow-y: scroll;
`;

export const JsonChart: React.FC<JsonChartProps> = ({ chart }) => {
  return (
    <StylePre style={{ maxHeight: 300, overflowY: 'scroll' }}>
      <code>{JSON.stringify(chart, null, 2)}</code>
    </StylePre>
  );
};

export default JsonChart;
