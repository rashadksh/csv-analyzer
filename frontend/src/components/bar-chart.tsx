import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';
import { ChartsAxis } from '@mui/x-charts/ChartsAxis';

export interface BarChartProps {
  labels: string[];
  data: number[];
}

export const BarChart: React.FC<BarChartProps> = ({ labels, data }) => {
  return (
    <ResponsiveChartContainer
      series={[{ type: 'bar', data }]}
      xAxis={[{ scaleType: 'band', data: labels }]}
      height={300}
    >
      <BarPlot />
      <ChartsAxis />
      <ChartsTooltip />
    </ResponsiveChartContainer>
  );
};

export default BarChart;
