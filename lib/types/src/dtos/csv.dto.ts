export type CreateCSVFileDTO = {
  name: string;
  path: string;
};

export type AskCSVFileDTO = {
  question: string;
};

export type AskCSVFileResponseDTO = {
  answer: string;
};
