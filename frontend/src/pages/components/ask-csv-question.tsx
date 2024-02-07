import { useState } from 'react';
import { useFormik } from 'formik';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export interface AskCsvQuestionProps {
  onSubmit: (question: string) => Promise<string>;
}

export const AskCsvQuestion: React.FC<AskCsvQuestionProps> = ({ onSubmit }) => {
  const [chat, setChat] = useState<string[]>([]);

  const formik = useFormik({
    initialValues: {
      question: '',
    },
    onSubmit: async (values) => {
      try {
        setChat((current) => current.concat(values.question));
        formik.resetForm();
        const answer = await onSubmit(values.question);
        setChat((current) => current.concat([answer]));
      } catch {
        alert('Something wrong happened, please try again');
      }
    },
  });

  const isSubmitDisabled =
    formik.values.question.length <= 0 || formik.isSubmitting;

  return (
    <>
      <Typography variant="body1">Ask your file a question</Typography>
      <br />
      {chat.length > 0 ? (
        <Box marginBottom={1}>
          <List>
            {chat.map((message, id) => (
              <ListItem key={id}>
                <ListItemText>{message}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>
      ) : null}
      <TextField
        variant="outlined"
        type="text"
        multiline
        placeholder="What are the top 5 sold products?"
        {...formik.getFieldProps('question')}
        fullWidth
      />
      <br />
      <br />
      <Button
        variant="contained"
        disabled={isSubmitDisabled}
        onClick={formik.submitForm}
        fullWidth
      >
        Ask
      </Button>
    </>
  );
};

export default AskCsvQuestion;
