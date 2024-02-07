import styled from '@emotion/styled';
import Button, { ButtonProps } from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export interface UploadButtonProps extends Omit<ButtonProps, 'onChange'> {
  accept?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const VisuallyHiddenInput = styled.input`
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  whitespace: nowrap;
  width: 1;
`;

export const UploadButton: React.FC<UploadButtonProps> = ({
  children,
  accept,
  value,
  onChange,
  ...others
}) => {
  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
      {...others}
    >
      {children}
      <VisuallyHiddenInput type="file" accept={accept} onChange={onChange} />
    </Button>
  );
};

export default UploadButton;
