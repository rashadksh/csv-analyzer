import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export interface PageErrorProps {}

export const PageError: React.FC<PageErrorProps> = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Typography variant="body1">
        Something wrong happened. Please try to refresh the page.
      </Typography>
    </Box>
  );
};

export default PageError;
