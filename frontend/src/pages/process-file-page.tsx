import { useNavigate } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';

import UploadButton from '../components/upload-button';
import { useProcessCSVFile } from '../api/csv-api';

export interface ProcessFilePageProps {}

export const ProcessFilePage: React.FC<ProcessFilePageProps> = () => {
  const navigate = useNavigate();
  const { mutateAsync: uploadFile, isLoading: isUploading } =
    useProcessCSVFile();

  const handleUpload: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);
      const uploadedFile = await uploadFile(formData);
      navigate(`/csv/${uploadedFile.id}`);
    } catch {
      alert('error');
    }
  };

  return (
    <Stack direction="row" justifyContent="center">
      <Stack
        spacing={2}
        direction="column"
        justifyContent="center"
        minHeight="80vh"
      >
        <Typography variant="h6">Start analyzing csv files</Typography>
        <UploadButton
          onChange={handleUpload}
          accept=".csv"
          disabled={isUploading}
        >
          Upload file
        </UploadButton>
      </Stack>
    </Stack>
  );
};

export default ProcessFilePage;
