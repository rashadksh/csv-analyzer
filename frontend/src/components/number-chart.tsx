import { Box, Typography } from '@mui/material';

export interface NumberChartProps {
  value: number;
}

export const NumberChart: React.FC<NumberChartProps> = ({ value }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={300}
    >
      <Typography variant="h4">{Number(value).toFixed(2)}</Typography>
    </Box>
  );
};

export default NumberChart;
