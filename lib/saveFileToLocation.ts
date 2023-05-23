import * as xlsx from 'xlsx';

export function saveExcelFile(inputFilePath: string, outputFilePath: string): void {
  const workbook: xlsx.WorkBook = xlsx.readFile(inputFilePath);
  xlsx.writeFile(workbook, outputFilePath);
}
