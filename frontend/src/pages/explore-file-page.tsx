import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CSVFileChartType, CSVFileState } from '@csv-analyzer/types';

import { useAskCSVFileById, useCSVFileById } from '../api/csv-api';
import {
  getCSVFileChartLabels,
  getCSVFileChartValues,
  getCSVFileProcessingProgress,
  getCSVFileStateText,
  transformCSVFileChartIntoPieChartData,
  transformCSVRowIntoDataGridColumns,
} from '../lib/util';
import Loading from '../components/loading';
import PageError from '../components/page-error';
import LinearProgress from '../components/linear-progress';
import BarChart from '../components/bar-chart';
import NumberChart from '../components/number-chart';
import PieChart from '../components/pie-chart';
import JsonChart from '../components/json-chart';
import Table from '../components/table';
import AskCsvQuestion from './components/ask-csv-question';

export interface ExploreFilePageProps {}

export const ExploreFilePage: React.FC<ExploreFilePageProps> = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useCSVFileById(id!);
  const { mutateAsync: askFile } = useAskCSVFileById(id!);

  const handleAskQuestion = async (question: string) => {
    const { answer } = await askFile({ question });
    return answer;
  };

  const file = data?.file;
  const rows = data?.rows ?? [{}];

  const isFileProcessing =
    file && ![CSVFileState.DONE, CSVFileState.FAILED].includes(file.state);
  const isFileProcessingFailed = file && file.state === CSVFileState.FAILED;
  const isFileReady = file && file.state === CSVFileState.DONE;

  return (
    <Box>
      {isLoading ? <Loading minHeight="80vh" /> : null}
      {isError ? <PageError /> : null}
      {!isLoading && !isError && file ? (
        <Box>
          <Typography variant="h6">{file.name}</Typography>
          {isFileProcessing ? (
            <Box paddingY={15}>
              <Typography>{getCSVFileStateText(file.state)}</Typography>
              <LinearProgress
                value={getCSVFileProcessingProgress(file.state)}
              />
            </Box>
          ) : null}
          {isFileProcessingFailed ? (
            <Box paddingY={15}>
              <Typography variant="body1" textAlign="center">
                File processing failed. Please try uploading your csv file
                again.
              </Typography>
            </Box>
          ) : null}
          {isFileReady ? (
            <Grid container spacing={5} marginTop={1}>
              {file.charts.map((chart, index) => (
                <Grid item key={index} xs={12} lg={6}>
                  <Box
                    height="100%"
                    padding={3}
                    sx={{
                      background: (theme) => theme.palette.common.white,
                      boxShadow: (theme) => theme.shadows[1],
                    }}
                  >
                    <Typography variant="caption">{chart.title}</Typography>
                    <Box marginTop={5}>
                      {chart.type === CSVFileChartType.BAR ? (
                        <BarChart
                          labels={getCSVFileChartLabels(chart)}
                          data={getCSVFileChartValues(chart)}
                        />
                      ) : chart.type === CSVFileChartType.NUMBER ? (
                        <NumberChart value={chart.values[0]?.value} />
                      ) : chart.type === CSVFileChartType.PIE ? (
                        <PieChart
                          data={transformCSVFileChartIntoPieChartData(chart)}
                        />
                      ) : (
                        <JsonChart chart={chart} />
                      )}
                    </Box>
                  </Box>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Box
                  sx={{
                    background: (theme) => theme.palette.common.white,
                    boxShadow: (theme) => theme.shadows[1],
                    overflowX: 'scroll',
                  }}
                >
                  <Table
                    rowIdKey="_id"
                    columns={transformCSVRowIntoDataGridColumns(rows[0])}
                    data={rows}
                    pageSize={10}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  padding={3}
                  sx={{
                    background: (theme) => theme.palette.common.white,
                    boxShadow: (theme) => theme.shadows[1],
                  }}
                >
                  <AskCsvQuestion onSubmit={handleAskQuestion} />
                </Box>
              </Grid>
            </Grid>
          ) : null}
        </Box>
      ) : null}
    </Box>
  );
};

export default ExploreFilePage;
