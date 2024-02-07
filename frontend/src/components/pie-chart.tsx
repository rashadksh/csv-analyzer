import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { ChartsLegend } from '@mui/x-charts/ChartsLegend';
import { PiePlot } from '@mui/x-charts/PieChart';
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';

export interface PieChartProps {
  data: { id: number; value: number; label: string }[];
}

export const PieChart: React.FC<PieChartProps> = ({ data }) => {
  return (
    <ResponsiveChartContainer
      height={300}
      series={[
        {
          type: 'pie',
          data,
          innerRadius: 30,
          outerRadius: 100,
          paddingAngle: 5,
          cornerRadius: 5,
          cx: 50,
          arcLabel: (props) => props.formattedValue,
        },
      ]}
    >
      <PiePlot />
      <ChartsTooltip />
      <ChartsLegend
        direction="column"
        position={{
          horizontal: 'right',
          vertical: 'top',
        }}
        slotProps={{
          legend: {
            direction: 'column',
            position: {
              vertical: 'middle',
              horizontal: 'right',
            },
            itemMarkWidth: 15,
            itemMarkHeight: 15,
            markGap: 5,
            itemGap: 10,
          },
        }}
      />
    </ResponsiveChartContainer>
  );
};

export default PieChart;
