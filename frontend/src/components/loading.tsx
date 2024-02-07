import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export interface LoadingProps {
  minHeight?: number | string;
}

export const Loading: React.FC<LoadingProps> = ({ minHeight }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight={minHeight}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
