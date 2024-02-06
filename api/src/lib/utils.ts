export function convertFileNameToTitle(fileName: string): string {
  const fileNameWithoutExtension = fileName.split('.')[0];
  const capitalizedFileName =
    fileNameWithoutExtension.charAt(0).toUpperCase() +
    fileNameWithoutExtension.slice(1);
  return capitalizedFileName;
}
