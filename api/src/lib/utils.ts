export function convertFileNameToTitle(fileName: string): string {
  const fileNameWithoutExtension = fileName.split('.')[0];
  const capitalizedFileName =
    fileNameWithoutExtension.charAt(0).toUpperCase() +
    fileNameWithoutExtension.slice(1);
  return capitalizedFileName;
}

export function transformCSVParseOutputToObject(header: string[], row: object) {
  const rowObject: Record<string, unknown> = {};
  const rowValues = Object.values(row);
  header.forEach((column, index) => {
    rowObject[column] = rowValues[index];
  });
  return rowObject;
}
